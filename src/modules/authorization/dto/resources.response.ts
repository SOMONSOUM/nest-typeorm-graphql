import { ObjectType } from "@nestjs/graphql";
import { GenericResponse } from "~/common/dto";
import { Resource } from "../entities";

@ObjectType()
export class ResourcesResponse extends GenericResponse<Array<Resource>>(() => [Resource]) { }