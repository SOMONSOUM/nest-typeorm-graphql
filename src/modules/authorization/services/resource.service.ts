import { Injectable, Logger } from "@nestjs/common";
import { ResourceRepository } from "../repositories";
import { GraphQLError } from "graphql";
import { ERROR_MESSAGES, ERRORSTATUSCODE } from "~/common/errors";
import { createResourceInput } from "../dto";

@Injectable()
export class ResourceService {
  private readonly logger = new Logger(ResourceService.name)
  constructor(private readonly resourceRepository: ResourceRepository) { }

  async create(input: createResourceInput) {
    try {
      const foundResource = await this.resourceRepository.findOneBy({ name: input.name });
      if (foundResource) {
        throw new GraphQLError(ERROR_MESSAGES.CONFLICT, {
          extensions: {
            code: ERRORSTATUSCODE.CONFLICT,
          }
        })
      }
      return await this.resourceRepository.save(input);
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
    return await this.resourceRepository.find();
  }
}