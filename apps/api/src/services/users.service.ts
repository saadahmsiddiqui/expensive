import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export interface UserDefaultSelections {
  firstName: string;
  lastName: string;
  createdOn: Date;
  email: string;
}

@Injectable()
export class UsersService {
  DEFAULT_SELECTIONS = {
    password: false,
    firstName: true,
    lastName: true,
    createdOn: true,
    email: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  async getUser(userId: string): Promise<UserDefaultSelections | undefined> {
    return await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
      select: this.DEFAULT_SELECTIONS,
    });
  }

  async getUsers(): Promise<UserDefaultSelections[]> {
    return this.prismaService.user.findMany({
      select: this.DEFAULT_SELECTIONS,
    });
  }
}
