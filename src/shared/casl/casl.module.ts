import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslGuard } from './guards';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from '~/modules/user/user.service';
import { HashService } from '../hash/hash.service';

@Module({
  imports: [],
  providers: [
    HashService,
    UserService,
    CaslAbilityFactory,
    CaslGuard,
    { provide: APP_GUARD, useClass: CaslGuard },
  ],
  exports: [CaslAbilityFactory, CaslGuard],
})
export class CaslModule { }
