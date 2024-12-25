import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { TokenService } from './services/token.service';
import { AuthenticationService } from './services/authentication.service';
import { HashService } from '~/shared/hash/hash.service';
import { UserService } from '../user/user.service';
import { AuthenticationResolver } from './authentication.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessTokenGuard } from './guards';
import { Role } from '../authorization/entities';
import { RoleService } from '../authorization/services';
import { RoleRepository } from '../authorization/repositories';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [
    TokenService,
    AuthenticationService,
    HashService,
    UserService,
    AuthenticationResolver,
    UserRepository,
    RoleService,
    RoleRepository,
    JwtAccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenGuard,
    },
  ],
})
export class AuthenticationModule {}
