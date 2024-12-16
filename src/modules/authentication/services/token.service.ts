import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensInput } from '../dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async generateTokenPair(input: GenerateTokensInput) {
    const { userId } = input;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: `${this.configService.getOrThrow<string>(
            'ACCESS_TOKEN_EXPIRATION_MS',
          )}ms`,
          secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
        },
      ),
      await this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: `${this.configService.getOrThrow<string>(
            'REFRESH_TOKEN_EXPIRATION_MS',
          )}ms`,
          secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
