import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '~/common/entities';
import { User } from '~/modules/user/entities/user.entity';
import { RolePermission } from './role-permission.entity';

@ObjectType()
@Entity('roles')
export class Role extends BaseEntity {
  @Field(() => String)
  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  description: string | null;

  @OneToMany(() => User, (user) => user.role, { onDelete: 'CASCADE' })
  @Field(() => [User], { nullable: true })
  users: User[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  @Field(() => [RolePermission], { nullable: true })
  rolePermissions: RolePermission[];
}
