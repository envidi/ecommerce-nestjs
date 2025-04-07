import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  handleCreateProduct(payload: CreateProductDto) {
    const createdProduct = this.productRepo.create(payload);
    return this.productRepo.save(createdProduct);
  }
  handleDeleteProduct(id: string) {
    return this.productRepo.delete(id);
  }

  async handleUpdateProduct(payload: UpdateProductDto, id: number) {
    const findProduct = await this.productRepo.findOneBy({
      id: id,
    });
    if (!findProduct) {
      throw new NotFoundException('Product not found');
    }
    const updatedProduct = this.productRepo.merge(findProduct, payload);
    return this.productRepo.save(updatedProduct);
  }

  async getAllProduct() {
    return this.productRepo.find();
  }
}
