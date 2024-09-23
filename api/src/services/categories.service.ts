import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from '../interfaces/dto';

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

  async getCategory(categoryId: string): Promise<Category | undefined> {
    return this.prismaService.category.findFirst({
      where: {
        id: categoryId,
      },
    });
  }
}
