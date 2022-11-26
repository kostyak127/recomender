import { Module } from '@nestjs/common';

import { ConfigurationFactory } from './config.factory';
import { Config } from './config.variable-getter.service';

const configProvider = ConfigurationFactory.provider();

@Module({
  providers: [configProvider, Config],
  exports: [],
})
export class ConfigModule {}
