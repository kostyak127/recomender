import { Inject, Injectable } from '@nestjs/common';
import { Configuration } from './config';

@Injectable()
export class Config {
  public static PORT: number;

  //DB PARAMS
  public static DB_HOST: string;
  public static DB_PORT: number;
  public static DB_USER: string;
  public static DB_NAME: string;
  public static DB_PASSWORD: string;

  public constructor(
    @Inject(Configuration)
    private readonly config: Configuration,
  ) {
    Config.PORT = this.config.getNumberOrElse('PORT', 3000);
    Config.DB_HOST = this.config.getStringOrThrow('DB_HOST');
    Config.DB_USER = this.config.getStringOrThrow('DB_USER');
    Config.DB_PORT = this.config.getNumberOrThrow('DB_PORT');
    Config.DB_NAME = this.config.getStringOrThrow('DB_NAME');
    Config.DB_PASSWORD = this.config.getStringOrThrow('DB_PASSWORD');
  }
}
