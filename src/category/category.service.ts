import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  handleCreateCategory(payload: CreateCategoryDto) {
    console.log(payload);
    const createdCategory = this.categoryRepo.create(payload);
    return this.categoryRepo.save(createdCategory);
  }

  getAll() {
    return this.categoryRepo.find();
  }
}
