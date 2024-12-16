import { ObjectType } from "@nestjs/graphql";
import { GenericResponse } from "~/common/dto";
import { Permission } from "../entities";

@ObjectType()
export class PermissionsResponse extends GenericResponse<Array<Permission>>(() => [Permission]) { }