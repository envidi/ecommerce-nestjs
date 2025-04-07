import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/enum';

export class UpdateUserDto {
  @ApiProperty({
    example: 'phanm711996@gmail.com',
    description: 'Provide the email of the user',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'envidi',
    description: 'Provide the name of the user',
  })
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be one of: admin, staff, guest' })
  role: Role;
}
