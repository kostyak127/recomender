import { Injectable } from '@nestjs/common';
import { LoggerContract } from '../logger.contract';

@Injectable()
export class LoggerService implements LoggerContract {
  public error(message: any, error: Error, optionalParams?: any): void {
    console.error(error, optionalParams);
  }

  public log(message: any, optionalParams?: any): void {
    console.log(message, optionalParams);
  }

  public warn(message: any, optionalParams?: any): void {
    console.warn(message, optionalParams);
  }
}
