import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../interfaces/dto';
import { pbkdf2Sync } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  ENCRYPTION_SALT: Buffer;
  ENCRYPTION_ITERATIONS: number = 100000;
  ENCRYPTION_KEY_LENGTH: number = 64;
  HASING_ALGORITHM = 'sha512';

  DEFAULT_SELECTIONS = {
    password: false,
    firstName: true,
    lastName: true,
    createdOn: true,
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {
    this.ENCRYPTION_SALT = Buffer.from(
      this.configService.get<string>('USER_PASSWORD_ENCRYPTION_SALT'),
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

  async getUser(userId: string): Promise<User | undefined> {
    return await this.prismaService.user.findFirst<{}>({
      where: {
        id: userId,
      },
      select: this.DEFAULT_SELECTIONS,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany<{}>({
      select: this.DEFAULT_SELECTIONS,
    });
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return false;

    const passwordHash = pbkdf2Sync(
      password,
      this.ENCRYPTION_SALT,
      this.ENCRYPTION_ITERATIONS,
      this.ENCRYPTION_KEY_LENGTH,
      this.HASING_ALGORITHM
    ).toString('hex');

    if (user.password === passwordHash) {
      return true;
    }

    return false;
  }
}
