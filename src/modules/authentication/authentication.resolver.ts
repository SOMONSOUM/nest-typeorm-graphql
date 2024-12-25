import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationService } from './services/authentication.service';
import {
  LoginInput,
  LoginResponse,
  RefreshTokenInput,
  RefreshTokenResponse,
} from './dto';
import { CurrentUser, Public } from '~/common/decorators';
import { User } from '../user/entities/user.entity';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => LoginResponse)
  @Public()
  async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
    return {
      error: 0,
      message: 'Login successfully',
      data: await this.authenticationService.login(input),
    };
  }

  @Mutation(() => RefreshTokenResponse)
  @Public()
  async refreshToken(
    @Args('input') input: RefreshTokenInput,
  ): Promise<RefreshTokenResponse> {
    const { accessToken, refreshToken } =
      await this.authenticationService.refreshToken(input);

    return {
      error: 0,
      message: 'Refresh token successfully',
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  @Query(() => User)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
