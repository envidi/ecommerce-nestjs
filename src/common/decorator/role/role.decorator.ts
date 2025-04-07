import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY } from 'src/common/constants';
import { Role as RoleEnum } from 'src/enum';

export const Role = (...args: [RoleEnum, ...RoleEnum[]]) =>
  SetMetadata(ROLE_KEY, args);
