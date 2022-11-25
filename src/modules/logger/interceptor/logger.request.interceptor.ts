import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerContract } from '../logger.contract';

@Injectable()
export class LoggerRequestInterceptor implements NestInterceptor {
  public constructor(private readonly logger: LoggerContract) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const start = new Date().getTime();
    const req: Request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        const timeWorks = new Date().getTime() - start;
        this.logger.log(
          `request ${req.url} with data ${JSON.stringify(req.body)}`,
        );
        this.logger.log(`Executed for ${timeWorks} ms`);
        this.logger.log('___________________________________________________');
      }),
    );
  }
}
