import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PermissionService, RoleService, ResourceService } from "./services";
import {
  CreatePermissionInput,
  CreatePermissionResponse,
  createResourceInput,
  CreateResourceResponse,
  CreateRoleInput,
  CreateRoleResponse,
  PermissionsResponse,
  ResourcesResponse,
  RolesResponse
} from "./dto";

@Resolver()
export class AuthorizationResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly resourceService: ResourceService,
    private readonly permissionService: PermissionService
  ) { }

  @Mutation(() => CreateRoleResponse)
  async createRole(@Args('input') input: CreateRoleInput): Promise<CreateRoleResponse> {
    return {
      error: 0,
      message: "Create role successfully",
      data: await this.roleService.create(input)
    }
  }

  @Mutation(() => CreateResourceResponse)
  async createResource(@Args('input') input: createResourceInput): Promise<CreateResourceResponse> {
    return {
      error: 0,
      message: "Create resource successfully",
      data: await this.resourceService.create(input)
    }
  }

  @Mutation(() => CreatePermissionResponse)
  async createPermission(@Args('input') input: CreatePermissionInput): Promise<CreatePermissionResponse> {
    return {
      error: 0,
      message: "Create permission successfully",
      data: await this.permissionService.create(input)
    }
  }

  @Query(() => RolesResponse)
  async roles(): Promise<RolesResponse> {
    return {
      error: 0,
      message: "Get all roles successfully",
      data: await this.roleService.findAll()
    }
  }

  @Query(() => ResourcesResponse)
  async resources(): Promise<ResourcesResponse> {
    return {
      error: 0,
      message: "Get all resources successfully",
      data: await this.resourceService.findAll()
    }
  }

  @Query(() => PermissionsResponse)
  async permissions(): Promise<PermissionsResponse> {
    return {
      error: 0,
      message: "Get all permissions successfully",
      data: await this.permissionService.findAll()
    }
  }
}