import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission, Resource, Role, RolePermission } from "./entities";
import { PermissionResource } from "./entities/permission-resource.entity";
import { AuthorizationResolver } from "./authorization.resolver";
import { AuthorizationService, PermissionService, ResourceService, RoleService } from "./services";
import { PermissionRepository, ResourceRepository, RoleRepository } from "./repositories";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Permission,
      Role,
      RolePermission,
      PermissionResource,
      Resource,
    ])
  ],
  providers: [
    AuthorizationResolver,
    AuthorizationService,
    RoleService,
    RoleRepository,
    ResourceService,
    ResourceRepository,
    PermissionService,
    PermissionRepository
  ]
})

export class AuthorizationModule { }