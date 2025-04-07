import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity';
import { ConfigModule } from '@nestjs/config';
import { PermissionService } from 'src/common';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, PermissionService],
})
export class UserModule {}
