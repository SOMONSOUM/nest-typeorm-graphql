import { Injectable, Logger } from "@nestjs/common";
import { RoleRepository } from "../repositories";
import { CreateRoleInput } from "../dto";
import { GraphQLError } from "graphql";
import { ERROR_MESSAGES, ERRORSTATUSCODE } from "~/common/errors";

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name)
  constructor(
    private readonly roleRepository: RoleRepository
  ) { }

  async create(input: CreateRoleInput) {
    try {
      const foundRole = await this.roleRepository.findOneBy({ name: input.name });

      if (foundRole) {
        throw new GraphQLError(ERROR_MESSAGES.CONFLICT, {
          extensions: {
            code: ERRORSTATUSCODE.CONFLICT,
          }
        })
      }

      return await this.roleRepository.save(input);
    } catch (error) {
      this.logger.error(error);
      if (error instanceof GraphQLError) {
        throw error;
      } else {
        throw new GraphQLError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
          extensions: {
            code: ERRORSTATUSCODE.INTERNAL_SERVER_ERROR,
          }
        })
      }
    }
  }

  async findAll() {
    return await this.roleRepository.find();
  }
}