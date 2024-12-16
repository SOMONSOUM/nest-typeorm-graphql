import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GenerateTokensInput {
  @Field(() => Int)
  userId: number;
}
