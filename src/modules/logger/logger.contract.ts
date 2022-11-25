import { Injectable } from '@nestjs/common';
import { ErrorLogFunction, LogFunction } from './types/logger.type';

@Injectable()
export abstract class LoggerContract {
  abstract error: ErrorLogFunction;
  abstract log: LogFunction;
  abstract warn: LogFunction;
}
