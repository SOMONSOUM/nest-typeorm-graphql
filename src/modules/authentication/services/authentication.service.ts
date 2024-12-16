import { Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "~/modules/user/repositories/user.repository";
import { HashService } from "~/shared/hash/hash.service";
import { LoginInput, RefreshTokenInput } from "../dto";
import { GraphQLError } from "graphql";
import { ERROR_MESSAGES, ERRORSTATUSCODE } from "~/common/errors";
import { TokenService } from "./token.service";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async login(input: LoginInput) {
    try {
      const user = await this.userRepository.findOneBy({ email: input.email })

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: ERRORSTATUSCODE.NOT_FOUND,
          },
        });
      }

      const isMatch = await this.hashService.compareHash(
        input.password,
        user.password,
      );

      if (!isMatch) {
        throw new GraphQLError(ERROR_MESSAGES.INVALID_CREDENTIALS, {
          extensions: {
            code: ERRORSTATUSCODE.INVALID_CREDENTIALS,
          },
        });
      }

      const { accessToken, refreshToken } =
        await this.tokenService.generateTokenPair({
          userId: user.id,
        });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      this.logger.error(error)
      if (error instanceof GraphQLError) {
        throw error
      } else {
        throw new GraphQLError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
          extensions: {
            code: ERRORSTATUSCODE.INTERNAL_SERVER_ERROR,
          },
        });
      }
    }
  }

  async refreshToken(input: RefreshTokenInput) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        input.refreshToken,
        {
          secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
        },
      );
      if (!payload) {
        throw new GraphQLError('Invalid refresh token', {
          extensions: {
            code: ERRORSTATUSCODE.UNAUTHORIZED,
          },
        });
      }

      const { accessToken, refreshToken } =
        await this.tokenService.generateTokenPair({
          userId: payload.sub,
        });
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      this.logger.error(error);
      if (error instanceof GraphQLError) {
        throw error;
      }
      if (error instanceof JsonWebTokenError) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.name,
          },
        });
      } else {
        throw new GraphQLError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
          extensions: {
            code: ERRORSTATUSCODE.INTERNAL_SERVER_ERROR,
          },
        });
      }
    }
  }
}