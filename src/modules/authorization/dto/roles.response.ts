import { ObjectType } from "@nestjs/graphql";
import { GenericResponse } from "~/common/dto";
import { Role } from "../entities";

@ObjectType()
export class RolesResponse extends GenericResponse<Array<Role>>(() => [Role]) { }