import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { TokenService } from "./services/token.service";
import { AuthenticationService } from "./services/authentication.service";
import { HashService } from "~/shared/hash/hash.service";
import { UserService } from "../user/user.service";
import { AuthenticationResolver } from "./authentication.resolver";
import { JwtModule } from "@nestjs/jwt";
import { UserRepository } from "../user/repositories/user.repository";
import { JwtAccessTokenStrategy } from "./strategies/jwt-access-token.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAccessTokenGuard } from "./guards";

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    TokenService,
    AuthenticationService,
    HashService,
    UserService,
    AuthenticationResolver,
    UserRepository,
    JwtAccessTokenStrategy,
    {
      provide: APP_GUARD, useClass: JwtAccessTokenGuard
    }
  ],
})

export class AuthenticationModule { }