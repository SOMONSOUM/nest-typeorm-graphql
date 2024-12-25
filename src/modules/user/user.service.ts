import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserInput } from './dto/create-user.input';
import { GraphQLError } from 'graphql';
import { HashService } from 'src/shared/hash/hash.service';
import { ERROR_MESSAGES, ERRORSTATUSCODE } from 'src/common/errors';
import { RoleService } from '../authorization/services';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly roleService: RoleService,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.rolePermissions', 'rolePermission')
      .leftJoinAndSelect('rolePermission.permission', 'permission')
      .leftJoinAndSelect('permission.permissionResources', 'permissionResource')
      .leftJoinAndSelect('permissionResource.resource', 'resource')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new GraphQLError(ERROR_MESSAGES.NOT_FOUND, {
        extensions: {
          code: ERRORSTATUSCODE.NOT_FOUND,
        },
      });
    }

    // Format the data to match the required structure
    const formattedUser = {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      email: user.email,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
      role: {
        id: user.role.id,
        name: user.role.name,
        description: user.role.description,
        createdAt: user.role.createdAt,
        updatedAt: user.role.updatedAt,
        permissions: user.role.rolePermissions.map((rolePermission) => ({
          id: rolePermission.permission.id,
          name: rolePermission.permission.name,
          description: rolePermission.permission.description,
          createdAt: rolePermission.permission.createdAt,
          updatedAt: rolePermission.permission.updatedAt,
          resources: rolePermission.permission.permissionResources.map(
            (permissionResource) => ({
              id: permissionResource.resource.id,
              name: permissionResource.resource.name,
              description: permissionResource.resource.description,
              createdAt: permissionResource.resource.createdAt,
              updatedAt: permissionResource.resource.updatedAt,
            }),
          ),
        })),
      },
    };

    return formattedUser;
  }

  async create(input: CreateUserInput) {
    try {
      const [foundUser, foundRole] = await Promise.all([
        await this.userRepository.findOneBy({
          email: input.email,
        }),
        await this.roleService.findOne(1),
      ]);

      if (foundUser) {
        throw new GraphQLError(ERROR_MESSAGES.CONFLICT, {
          extensions: {
            code: ERRORSTATUSCODE.CONFLICT,
          },
        });
      }

      input.password = await this.hashService.hash(input.password);

      return await this.userRepository.save({
        ...input,
        role: foundRole,
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof GraphQLError) {
        throw error;
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
