import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard, Role, RoleGuard } from 'src/common';
import { Role as RoleEnum } from 'src/enum';

@Controller('category')
@ApiBearerAuth('Access Token')
@UseGuards(AuthGuard, RoleGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Role(RoleEnum.STAFF, RoleEnum.ADMIN)
  @Post()
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoryService.handleCreateCategory(payload);
  }

  @Role(RoleEnum.STAFF, RoleEnum.ADMIN)
  @Get()
  getAllCategory() {
    return this.categoryService.getAll();
  }
}
