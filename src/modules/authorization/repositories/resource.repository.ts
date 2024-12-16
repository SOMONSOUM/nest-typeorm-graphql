import { Injectable } from "@nestjs/common";
import { Resource } from "../entities";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ResourceRepository extends Repository<Resource> {
  constructor(@InjectRepository(Resource) private readonly repository: Repository<Resource>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}