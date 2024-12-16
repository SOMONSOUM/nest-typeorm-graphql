import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middlewares';
import { LoggerModule } from './shared/logger/logger.module';
import { formatGqlError } from './utils';
import { HashModule } from './shared/hash/hash.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { Request, Response } from 'express';
import { AuthorizationModule } from './modules/authorization/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
      csrfPrevention: true,
      persistedQueries: {
        ttl: 900,
      },
      formatError: formatGqlError,
    }),
    UserModule,
    LoggerModule,
    HashModule,
    AuthenticationModule,
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
