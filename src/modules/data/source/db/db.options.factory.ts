import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Config } from '../../../config/config.variable-getter.service';
import { DbUserEntity } from './user/db.user.entity';
import { DbProjectEntity } from './project/db.project.entity';
import { DbMealEntity } from './meal/db.meal.entity';
import { DbRatingEntity } from './rating/db.rating.entity';

export class DbOptionsFactory implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: Config.DB_HOST,
      port: Config.DB_PORT,
      username: Config.DB_USER,
      password: Config.DB_PASSWORD,
      database: Config.DB_NAME,
      entities: [DbUserEntity, DbProjectEntity, DbMealEntity, DbRatingEntity],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: false,
      logging: false,
      maxQueryExecutionTime: 7000,
    };
  }
}
