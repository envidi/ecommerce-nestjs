import { ForbiddenException } from '@nestjs/common';
import { permissionConf } from 'src/config';
import { UserEntity } from 'src/entity';
import { Role } from 'src/enum';
import { PermissionMap } from 'src/types';

export class PermissionService {
  canModify(currentUser: UserEntity, updateUserRole: Role) {
    const currentRole = permissionConf(currentUser.role as keyof PermissionMap);
    if (!currentRole) {
      throw new ForbiddenException('You do not have permission to modify this');
    }
    return currentRole.includes(updateUserRole);
  }
}
