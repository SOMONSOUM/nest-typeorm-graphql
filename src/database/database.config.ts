import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    logging: process.env.NODE_ENV !== 'production',
    migrationsRun: true,
    migrations: ['dist/src/database/migrations/*.js'],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
  }),
);
