import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string

  @Field(() => String, { nullable: true })
  fullname: string | null;

  @Field(() => String, { nullable: true })
  phoneNumber: string | null;
}
