import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/shared/hash/hash.service';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, UserRepository, HashService],
})
export class UserModule { }
