import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../interfaces/dto';
import { Category } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';
import { AuthorizedRequest } from '../services/auth.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createCategory(
    @Req() request: AuthorizedRequest,
    @Body() requestBody: CreateCategoryDto
  ): Promise<Category> {
    requestBody.data.createdBy = request.auth.userId;
    return this.categoriesService.createCategory(requestBody);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  async getCategoriesByCreator(
    @Req() request: AuthorizedRequest
  ): Promise<Category[]> {
    return this.categoriesService.getCategories(request.auth.userId);
  }

  @Get(':categoryId')
  async getCategory(
    @Param() params: { categoryId: string }
  ): Promise<Category | undefined> {
    return this.categoriesService.getCategory(params.categoryId);
  }
}
