import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/entity';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateUserDto } from './dto';
import { Request } from 'express';
import { PermissionService } from 'src/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private permissionService: PermissionService,
  ) {}

  getAllUser(): UserEntity {
    return plainToInstance(UserEntity, this.userRepo.find());
  }

  getDetail(id: string): UserEntity {
    return plainToInstance(
      UserEntity,
      this.userRepo.findOneBy({
        id: id,
      }),
    );
  }
  async deleteUserById(id: string): Promise<DeleteResult> {
    return this.userRepo.delete(id);
  }

  async handleUpdateUser(
    payload: UpdateUserDto,
    id: string,
    request: Request & { user: UserEntity },
  ) {
    const currentUser = request.user;
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    const findUser = await this.userRepo.findOneBy({
      id: id,
    });
    if (!findUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    if (!this.permissionService.canModify(currentUser, findUser.role)) {
      throw new ForbiddenException('You do not have permission to modify this');
    }

    const updatedUser = this.userRepo.merge(findUser, payload);
    return plainToInstance(UserEntity, this.userRepo.save(updatedUser));
  }
}
