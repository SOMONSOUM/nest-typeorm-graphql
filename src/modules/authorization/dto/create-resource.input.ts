import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createResourceInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description: string
}