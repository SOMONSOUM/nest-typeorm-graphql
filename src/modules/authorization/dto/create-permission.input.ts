import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;
}