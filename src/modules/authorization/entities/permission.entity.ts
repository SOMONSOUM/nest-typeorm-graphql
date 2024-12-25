import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '~/common/entities';
import { RolePermission } from './role-permission.entity';
import { PermissionResource } from './permission-resource.entity';

@Entity('permissions')
@ObjectType()
export class Permission extends BaseEntity {
  @Field(() => String)
  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  @Field(() => [RolePermission], { nullable: true })
  rolePermissions: RolePermission[];

  @OneToMany(
    () => PermissionResource,
    (permissionResource) => permissionResource.permission,
  )
  @Field(() => [PermissionResource], { nullable: true })
  permissionResources: PermissionResource[];
}
