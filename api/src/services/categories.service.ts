import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Category } from '@prisma/client';

interface CreateCategoryDto {
  data: {
    name: string;
    icon: string;
    createdBy: string;
  };
}

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    const newCategory = await this.prismaService.category.create(
      createCategoryDto
    );
    return newCategory;
  }

  async getCategories(creatorId: string): Promise<Category[]> {
    return this.prismaService.category.findMany({
      where: {
        createdBy: creatorId,
      },
    });
  }
}
