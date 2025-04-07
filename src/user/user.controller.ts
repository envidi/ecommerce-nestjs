import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entity';
import { Role as RoleEnum } from 'src/enum';
import { AuthGuard, Role, RoleGuard } from 'src/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from './dto';
import { Request as RequestExpress } from 'express';

@Controller('user')
@UseGuards(AuthGuard, RoleGuard)
@ApiBearerAuth('Access Token')
export class UserController {
  constructor(private userService: UserService) {}

  @Role(RoleEnum.STAFF, RoleEnum.ADMIN)
  @Get()
  getAllUser(): UserEntity {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getDetailUser(@Param() id: string) {
    return this.userService.getDetail(id);
  }
  @Role(RoleEnum.ADMIN)
  @Delete(':id')
  deleteUser(@Param() id: string) {
    return this.userService.deleteUserById(id);
  }
  @Role(RoleEnum.ADMIN, RoleEnum.STAFF)
  @Patch(':id')
  async updateUser(
    @Body() payload: UpdateUserDto,
    @Param('id') id: string,
    @Request() request: RequestExpress & { user: UserEntity },
  ) {
    return this.userService.handleUpdateUser(payload, id, request);
  }
}
