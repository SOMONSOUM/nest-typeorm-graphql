import { Field, ObjectType } from "@nestjs/graphql";
import { GenericResponse } from "~/common/dto";

@ObjectType()
export class TokensResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

@ObjectType()
export class LoginResponse extends GenericResponse<TokensResponse>(() => TokensResponse) { }