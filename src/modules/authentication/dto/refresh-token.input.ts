import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokenInput {
  @Field(() => String, { nullable: false })
  refreshToken: string;
}
