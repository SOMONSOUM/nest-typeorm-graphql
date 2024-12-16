import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UsersResponse } from './dto/users.response';
import { CreateUserResponse } from './dto/create-user.response';
import { Public } from '~/common/decorators';
import { UserResponse } from './dto/user.response';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => UsersResponse, { name: 'users' })
  async findAll(): Promise<UsersResponse> {
    return {
      error: 0,
      message: 'Get all users successfully',
      data: await this.userService.findAll(),
    };
  }

  @Query(() => UserResponse)
  async user(@Args('id', { type: () => Int }) id: number): Promise<UserResponse> {
    return {
      error: 0,
      message: 'Get user successfully',
      data: await this.userService.findOne(id)
    }
  }

  @Public()
  @Mutation(() => CreateUserResponse, { name: 'createUser' })
  async create(@Args('input') input: CreateUserInput): Promise<CreateUserResponse> {
    return {
      error: 0,
      message: 'Create user successfully',
      data: await this.userService.create(input),
    };
  }
}
