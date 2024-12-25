import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '~/common/entities';
import { PermissionResource } from './permission-resource.entity';

@Entity('resources')
@ObjectType()
export class Resource extends BaseEntity {
  @Field(() => String)
  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  description: string | null;

  @OneToMany(
    () => PermissionResource,
    (permissionResource) => permissionResource.resource,
  )
  @Field(() => [PermissionResource], { nullable: true })
  permissionResources: PermissionResource[];
}
