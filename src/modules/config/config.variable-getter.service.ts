import { Inject, Injectable } from '@nestjs/common';
import { Configuration } from './config';
import { Helper } from '../utils/utils.helper';

@Injectable()
export class Config {
  public static TOKEN: string;
  public static PORT: number;
  //DB PARAMS
  public static DB_HOST: string;
  public static DB_PORT: number;
  public static DB_USER: string;
  public static DB_NAME: string;
  public static DB_PASSWORD: string;

  //CACHE PARAMS
  public static MEAL_TTL: number;
  public static USER_TTL: number;
  public static RATING_TTL: number;
  public static PROJECT_TTL: number;
  constructor(
    @Inject(Configuration)
    private readonly config: Configuration,
  ) {
    Config.PORT = this.config.getNumberOrElse('PORT', 3000);
    Config.DB_HOST = this.config.getStringOrThrow('DB_HOST');
    Config.TOKEN = this.config.getStringOrThrow('TOKEN');
    Config.DB_USER = this.config.getStringOrThrow('DB_USER');
    Config.DB_PORT = this.config.getNumberOrThrow('DB_PORT');
    Config.DB_NAME = this.config.getStringOrThrow('DB_NAME');
    Config.DB_PASSWORD = this.config.getStringOrThrow('DB_PASSWORD');
    Config.MEAL_TTL = this.config.getNumberOrElse(
      'MEAL_TTL',
      Helper.MinutesInSeconds(5),
    );
    Config.RATING_TTL = this.config.getNumberOrElse(
      'RATING_TTL',
      Helper.MinutesInSeconds(5),
    );
    Config.USER_TTL = this.config.getNumberOrElse(
      'USER_TTL',
      Helper.MinutesInSeconds(60),
    );
    Config.PROJECT_TTL = this.config.getNumberOrElse(
      'PROJECT_TTL',
      Helper.MinutesInSeconds(60),
    );
  }
}
