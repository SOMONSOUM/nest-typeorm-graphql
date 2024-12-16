import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Permission } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PermissionRepository extends Repository<Permission> {
  constructor(@InjectRepository(Permission) private readonly repository: Repository<Permission>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}