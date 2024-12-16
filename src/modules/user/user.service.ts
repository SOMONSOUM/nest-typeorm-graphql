import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserInput } from './dto/create-user.input';
import { GraphQLError } from 'graphql';
import { HashService } from 'src/shared/hash/hash.service';
import { ERROR_MESSAGES, ERRORSTATUSCODE } from 'src/common/errors';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService
  ) { }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.createQueryBuilder(('user'))
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.rolePermissions', 'rolePermission')
      .leftJoinAndSelect('rolePermission.permission', 'permission')
      .leftJoinAndSelect('permission.permissionResources', 'permissionResource')
      .leftJoinAndSelect('permissionResource.resource', 'resource')
      .where('user.id = :id', { id })
      .getOne();

    const formattedUser = {
      ...user,
      role: {
        ...user.role,
        rolePermissions: user.role.rolePermissions.map((rolePermission) => ({
          ...rolePermission,
          permission: {
            ...rolePermission.permission,
            resources: rolePermission.permission.permissionResources.map((permissionResource) => permissionResource.resource)
          }
        }))
      }
    };
    this.logger.log(formattedUser);

    return user
  }

  async create(input: CreateUserInput) {
    try {
      const foundUser = await this.userRepository.findOneBy({ email: input.email });

      if (foundUser) {
        throw new GraphQLError(ERROR_MESSAGES.CONFLICT, {
          extensions: {
            code: ERRORSTATUSCODE.CONFLICT,
          }
        })
      }

      input.password = await this.hashService.hash(input.password);

      return await this.userRepository.save(input);

    } catch (error) {
      this.logger.error(error)
      if (error instanceof GraphQLError) {
        throw error
      } else {
        throw new GraphQLError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
          extensions: {
            code: ERRORSTATUSCODE.INTERNAL_SERVER_ERROR,
          }
        })
      }
    }
  }
}
