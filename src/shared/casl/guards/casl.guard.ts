import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from '../casl-ability.factory';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  PERMISSION_CHECKER_KEY,
  RequiredPermission,
} from '../decorators/check-permission.decorator';
import { GraphQLError } from 'graphql';
import { ERROR_MESSAGES, ERRORSTATUSCODE } from '~/common/errors';
import { DecoratorsName } from '~/common/decorators';
import { Request } from 'express';
import { User } from '~/modules/user/entities/user.entity';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request: Request;
    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || [];
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      DecoratorsName.Public,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    } else {
      request = this.getRequest(context);
    }

    if (!request?.user) {
      throw new GraphQLError(ERROR_MESSAGES.UNAUTHENTICATED, {
        extensions: {
          code: ERRORSTATUSCODE.UNAUTHENTICATED,
        },
      });
    }

    const user = request?.user as User;
    const ability = await this.caslAbilityFactory.createForUser(user);

    const hasPermission = requiredPermissions.every((permission) =>
      this.isAllowed(ability, permission),
    );

    if (!hasPermission) {
      throw new GraphQLError(ERROR_MESSAGES.UNAUTHORIZED, {
        extensions: {
          code: ERRORSTATUSCODE.UNAUTHORIZED,
        },
      });
    }

    return hasPermission;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  private isAllowed(
    ability: AppAbility,
    permission: RequiredPermission,
  ): boolean {
    const { action, subject } = permission;
    return ability.can(action, subject);
  }
}
