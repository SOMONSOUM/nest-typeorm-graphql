import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { GenericResponse } from '~/common/dto';
import { Role } from '~/modules/authorization/entities';

@ObjectType()
export class UserRoleResponse {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: true })
  fullname: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  profile: string;

  @Field(() => Role, { nullable: true })
  role: Role;
}

@ObjectType()
export class UserResponse extends GenericResponse<User>(() => User) {}
