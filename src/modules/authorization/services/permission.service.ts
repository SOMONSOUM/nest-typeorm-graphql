import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../repositories';
import { CreatePermissionInput } from '../dto/create-permission.input';
import { GraphQLError } from 'graphql';
import { ERRORSTATUSCODE } from '~/common/errors';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(input: CreatePermissionInput) {
    const permission = await this.permissionRepository.findOneBy({
      name: input.name,
    });
    if (permission) {
      throw new GraphQLError('Permission already exists', {
        extensions: {
          code: ERRORSTATUSCODE.CONFLICT,
        },
      });
    }
    return await this.permissionRepository.save(input);
  }

  async findAll() {
    return await this.permissionRepository.find();
  }
}
