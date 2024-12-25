import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/common/entities';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity('roles_permissions')
@ObjectType()
export class RolePermission extends BaseEntity {
  @ManyToOne(() => Role, (role) => role.rolePermissions)
  @Field(() => Role)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  @Field(() => Permission)
  permission: Permission;
}
