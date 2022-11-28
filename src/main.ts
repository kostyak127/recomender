import { NestFactory } from '@nestjs/core';
import { Config } from './modules/config/config.variable-getter.service';
import {AppModule} from "./modules/app.module";

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Config.PORT);
}
bootstrap();
