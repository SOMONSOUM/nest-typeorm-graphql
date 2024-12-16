import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from '~/common/enums/permissions.enum';
import { SubjectsEnum } from '~/common/enums/subjects.enum';

export interface RequiredPermission {
  action: PermissionsEnum;
  subject: SubjectsEnum;
}

export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
export const CheckPermission = (
  ...params: RequiredPermission[]
): CustomDecorator<string> => SetMetadata(PERMISSION_CHECKER_KEY, params);
