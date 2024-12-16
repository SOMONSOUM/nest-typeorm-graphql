import { ObjectType } from "@nestjs/graphql";
import { TokensResponse } from "./login.response";
import { GenericResponse } from "~/common/dto";


@ObjectType()
export class RefreshTokenResponse extends GenericResponse<TokensResponse>(() => TokensResponse) { }