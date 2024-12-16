import { ObjectType } from "@nestjs/graphql";
import { GenericResponse } from "~/common/dto";
import { Resource } from "../entities";

@ObjectType()
export class CreateResourceResponse extends GenericResponse<Resource>(() => Resource) { }