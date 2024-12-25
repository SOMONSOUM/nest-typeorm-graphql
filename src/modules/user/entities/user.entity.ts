import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from '~/modules/authorization/entities/role.entity';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  fullname: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profile: string;

  @ManyToOne(() => Role, (role) => role.users)
  @Field(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
