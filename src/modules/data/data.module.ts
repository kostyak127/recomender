import { Module } from '@nestjs/common';
import { DbModule } from './source/db/db.module';
import { CacheModule } from './source/cache/cache.module';
import { DataMealService } from './service/data.meal.service';
import { DataRatingService } from './service/data.rating.service';
import { DataUserService } from './service/data.user.service';
import { DataProjectService } from './service/data.project.service';
import { DataMealContract } from './contract/data.meal.contract';
import { DataProjectContract } from './contract/data.project.contract';
import { DataUserContract } from './contract/data.user.contract';
import { DataRatingContract } from './contract/data.rating.contract';

@Module({
  imports: [DbModule, CacheModule],
  providers: [
    DataMealService,
    DataRatingService,
    DataUserService,
    DataProjectService,
  ],
  exports: [
    { provide: DataMealContract, useClass: DataMealService },
    { provide: DataRatingContract, useClass: DataRatingService },
    { provide: DataUserContract, useClass: DataUserService },
    { provide: DataProjectContract, useClass: DataProjectService },
  ],
})
export class DataModule {}
