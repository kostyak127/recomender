import { join } from 'path';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Config } from '../../../config/config.variable-getter.service';

export class DbOptionsFactory implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: Config.DB_HOST,
      port: Config.DB_PORT,
      username: Config.DB_USER,
      password: Config.DB_PASSWORD,
      database: Config.DB_NAME,
      entities: [join(__dirname, '../../modules/**/*.entity.{ts,js}')],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: false,
      logging: false,
      maxQueryExecutionTime: 7000,
    };
  }
}
