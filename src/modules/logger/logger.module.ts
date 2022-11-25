import { Module } from '@nestjs/common';
import { LoggerContract } from './logger.contract';
import { LoggerService } from './service/logger.service';

@Module({
  providers: [{ provide: LoggerContract, useClass: LoggerService }],
  exports: [{ provide: LoggerContract, useClass: LoggerService }],
})
export class LoggerModule {}
