import { CacheModule as NestCacheModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [NestCacheModule.register()],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
