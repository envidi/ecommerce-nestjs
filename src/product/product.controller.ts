import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard, Role, RoleGuard } from 'src/common';
import { Role as RoleEnum } from 'src/enum';

@Controller('product')
@ApiBearerAuth('Access Token')
@UseGuards(AuthGuard, RoleGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Role(RoleEnum.STAFF, RoleEnum.ADMIN)
  @Get()
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Role(RoleEnum.STAFF, RoleEnum.ADMIN)
  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    return this.productService.handleCreateProduct(payload);
  }

  @Role(RoleEnum.STAFF, RoleEnum.ADMIN)
  @Patch(':id')
  updateProduct(@Body() payload: CreateProductDto, @Param('id') id: number) {
    return this.productService.handleUpdateProduct(payload, id);
  }
}
