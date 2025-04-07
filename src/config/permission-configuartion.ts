import { Role } from 'src/enum';
import { PermissionMap } from 'src/types';

export default (role: keyof PermissionMap): Role[] => {
  const permissions = {
    [Role.ADMIN]: [Role.STAFF, Role.GUEST],
    [Role.STAFF]: [Role.GUEST],
    [Role.GUEST]: null,
  };
  return permissions[role] || permissions[Role.GUEST];
};
