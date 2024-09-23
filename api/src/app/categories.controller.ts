import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../interfaces/dto';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  async createCategory(
    @Body() requestBody: CreateCategoryDto
  ): Promise<Category> {
    return this.categoriesService.createCategory(requestBody);
  }

  @Get('by/:creatorId')
  async getCategoriesByCreator(
    @Param() params: { creatorId: string }
  ): Promise<Category[]> {
    return this.categoriesService.getCategories(params.creatorId);
  }

  @Get(':categoryId')
  async getCategory(
    @Param() params: { categoryId: string }
  ): Promise<Category | undefined> {
    return this.categoriesService.getCategory(params.categoryId);
  }
}
