import { ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { GenericResponse } from "~/common/dto";

@ObjectType()
export class UsersResponse extends GenericResponse<Array<User>>(() => [User]) { }