import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDTO {
  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'Provide the email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '*********',
    description: 'Provide the password of the user',
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 2,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    example: 'Jane',
    description: 'Provide the name of the user',
  })
  @IsString()
  username: string;
}
