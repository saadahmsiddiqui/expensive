import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../interfaces/dto';
import { pbkdf2Sync } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

interface TokenPayload {
  email: string;
  userId: string;
}

export interface AuthorizedRequest extends Request {
  auth: { email: string; userId: string };
}

@Injectable()
export class AuthService {
  JWT_SIGNING_SECRET: string;
  ENCRYPTION_SALT: Buffer;
  ENCRYPTION_ITERATIONS = 100000;
  ENCRYPTION_KEY_LENGTH = 64;
  HASING_ALGORITHM = 'sha512';

  DEFAULT_SELECTIONS = {
    password: false,
    firstName: true,
    lastName: true,
    createdOn: true,
    email: true,
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {
    this.JWT_SIGNING_SECRET =
      this.configService.getOrThrow<string>('JWT_SIGNING_KEY');

    this.ENCRYPTION_SALT = Buffer.from(
      this.configService.getOrThrow<string>('USER_PASSWORD_ENCRYPTION_SALT'),
      'utf-8'
    );
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = pbkdf2Sync(
      createUserDto.data.password,
      this.ENCRYPTION_SALT,
      this.ENCRYPTION_ITERATIONS,
      this.ENCRYPTION_KEY_LENGTH,
      this.HASING_ALGORITHM
    );

    createUserDto.data.password = hashedPassword.toString('hex');
    const newUser = await this.prismaService.user.create(createUserDto);
    return newUser;
  }

  async login(email: string, password: string): Promise<null | string> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return null;

    const passwordHash = pbkdf2Sync(
      password,
      this.ENCRYPTION_SALT,
      this.ENCRYPTION_ITERATIONS,
      this.ENCRYPTION_KEY_LENGTH,
      this.HASING_ALGORITHM
    ).toString('hex');

    if (user.password !== passwordHash) {
      return null;
    }

    const jwtPayload: TokenPayload = {
      email: user.email,
      userId: user.id,
    };

    return this.jwtService.sign(jwtPayload, { secret: '' });
  }

  validateAccessToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException('Invalid or expired access token.', 401);
    }
  }
}
