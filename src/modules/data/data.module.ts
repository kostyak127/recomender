import { Module } from '@nestjs/common';
import { DbModule } from './source/db/db.module';
import { CacheModule } from './source/cache/cache.module';

@Module({
  imports: [DbModule, CacheModule],
})
export class DataModule {}
