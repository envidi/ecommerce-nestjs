import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'name category',
    description: 'fill the name of category',
  })
  @IsNotEmpty()
  name: string;
}
