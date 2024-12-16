import { Entity, ManyToOne } from "typeorm";
import { Resource } from "./resource.entity";
import { Permission } from "./permission.entity";
import { BaseEntity } from "~/common/entities";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity('permission_resources')
@ObjectType()
export class PermissionResource extends BaseEntity {
  @ManyToOne(() => Permission, (permission) => permission.permissionResources)
  @Field(() => Permission)
  permission: Permission

  @ManyToOne(() => Resource, (resource) => resource.permissionResources)
  @Field(() => Resource)
  resource: Resource
}