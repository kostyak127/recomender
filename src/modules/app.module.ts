import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { DomainModule } from './domain/domain.module';
import { ApiModule } from './api/api.module';

@Module({
  controllers: [AppController],
  imports: [DomainModule, LoggerModule, ApiModule],
})
export class AppModule {}
