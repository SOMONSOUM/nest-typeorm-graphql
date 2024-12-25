import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/shared/hash/hash.service';
import { RoleService } from '../authorization/services';
import { RoleRepository } from '../authorization/repositories';
import { Role } from '../authorization/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [
    UserResolver,
    UserService,
    UserRepository,
    HashService,
    RoleService,
    RoleRepository,
  ],
})
export class UserModule {}
