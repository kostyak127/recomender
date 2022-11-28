import { Global, Module, Provider, Type } from '@nestjs/common';
import {
  DataSource,
  DataSourceOptions,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { ConfigModule } from '../../../config/config.module';
import { DbOptionsFactory } from './db.options.factory';
import { LoggerModule } from '../../../logger/logger.module';
import { DbMealMapper } from './meal/db.meal-mapper.service';
import { DbProjectMapper } from './project/db.project-mapper.service';
import { DbRatingEntity } from './rating/db.rating.entity';
import { DbRatingMapper } from './rating/db.rating-mapper.service';
import { DbUserMapper } from './user/db.user-mapper.service';
import { DbProjectEntity } from './project/db.project.entity';
import { DbProjectRepository } from './project/db.project.repository';
import { DbRatingRepository } from './rating/db.rating.repository';
import { DbUserRepository } from './user/db.user.repository';
import { DbUserEntity } from './user/db.user.entity';
import { DbMealRepository } from './meal/db.meal.repository';
import { DbMealEntity } from './meal/db.meal.entity';

export function provideCustomRepository<T extends ObjectLiteral = any>(
  entity: Type<T>,
  repository: Type<Repository<T>>,
  dataSource?: DataSource | DataSourceOptions | string,
): Provider {
  return {
    provide: getRepositoryToken(entity),
    inject: [getDataSourceToken(dataSource)],
    useFactory(dataSource: DataSource) {
      const baseRepository = dataSource.getRepository(entity);
      return new repository(
        baseRepository.target,
        baseRepository.manager,
        baseRepository.queryRunner,
      );
    },
  };
}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DbOptionsFactory,
    }),
    TypeOrmModule.forFeature(),
    LoggerModule,
  ],
  providers: [
    DbMealMapper,
    DbProjectMapper,
    DbRatingMapper,
    DbUserMapper,
    provideCustomRepository(DbProjectEntity, DbProjectRepository),
    provideCustomRepository(DbMealEntity, DbMealRepository),
    provideCustomRepository(DbRatingEntity, DbRatingRepository),
    provideCustomRepository(DbUserEntity, DbUserRepository),
  ],
  exports: [
    DbMealMapper,
    DbProjectMapper,
    DbRatingMapper,
    DbUserMapper,
    provideCustomRepository(DbProjectEntity, DbProjectRepository),
    provideCustomRepository(DbMealEntity, DbMealRepository),
    provideCustomRepository(DbRatingEntity, DbRatingRepository),
    provideCustomRepository(DbUserEntity, DbUserRepository),
  ],
})
export class DbModule {}
