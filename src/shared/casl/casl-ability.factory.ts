import { Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  MongoAbility,
} from '@casl/ability';
import { PermissionsEnum } from '~/common/enums/permissions.enum';
import { User } from '~/modules/user/entities/user.entity';

export type PermissionObjectType = any;
export type AppAbility = MongoAbility<[PermissionsEnum, PermissionObjectType]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly userService: UserService) { }

  async createForUser(user: User): Promise<AppAbility> {
    const currentUser = await this.userService.findOne(user.id);

    const { can, cannot, build } = new AbilityBuilder<
      MongoAbility<[PermissionsEnum, PermissionObjectType]>
    >(createMongoAbility);

    if (currentUser?.role?.rolePermissions) {
      currentUser.role.rolePermissions.forEach((rolePermission) => {
        const action = rolePermission.permission.name as PermissionsEnum;
        const subject = rolePermission.permission.permissionResources;

        if (Object.values(PermissionsEnum).includes(action)) {
          can(action, subject);
        } else {
          cannot(action, subject);
        }
      });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<PermissionObjectType>,
    });
  }
}
