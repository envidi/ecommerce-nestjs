import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryEntity } from 'src/entity';
import { DeepPartial } from 'typeorm';

export class UpdateProductDto {
  @ApiProperty({
    example: 'product name',
    description: 'Provide the name of the product',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'product price',
    description: 'Provide the price of the product',
  })
  @IsInt()
  price: number;

  @ApiProperty({
    example: 'product description',
    description: 'Provide the description of the product',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'product category',
    description: 'Provide the category of the product',
  })
  @IsOptional()
  category: DeepPartial<CategoryEntity> | undefined;
}
