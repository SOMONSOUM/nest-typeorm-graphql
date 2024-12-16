import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthenticationService } from "./services/authentication.service";
import { LoginInput, LoginResponse, RefreshTokenInput, RefreshTokenResponse } from "./dto";
import { Public } from "~/common/decorators";

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Mutation(() => LoginResponse)
  @Public()
  async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
    return {
      error: 0,
      message: 'Login successfully',
      data: await this.authenticationService.login(input),
    }
  }

  @Mutation(() => RefreshTokenResponse)
  @Public()
  async refreshToken(@Args('input') input: RefreshTokenInput): Promise<RefreshTokenResponse> {
    const { accessToken, refreshToken } = await this.authenticationService.refreshToken(input)

    return {
      error: 0,
      message: 'Refresh token successfully',
      data: {
        accessToken,
        refreshToken
      }
    }
  }
}
