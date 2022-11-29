import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { DataModule } from '../data/data.module';
import { DomainDatetimeHandler } from './service/datetime/domain.datetime-handler.service';
import { DomainMealCreator } from './service/meal/domain.meal-creator.service';
import { DomainOrderHandler } from './service/order/domain.order-handler.service';
import { DomainProjectCreator } from './service/project/domain.project-creator.service';
import { DomainProjectGetter } from './service/project/domain.project-getter.service';
import { DomainRatingCompiler } from './service/rating/domain.rating-compiler.service';
import { DomainRatingUpdater } from './service/rating/domain.rating-updater.service';
import { DomainUserCreator } from './service/user/domain.user-creator.service';
import { DomainUserGetter } from './service/user/domain.user-getter.service';
import { DomainMealGetter } from './service/meal/domain.meal-getter.service';
import { DomainRecommendationGetter } from './service/recommendation/domain.recommendation-getter.service';

@Module({
  imports: [LoggerModule, DataModule],
  providers: [
    DomainDatetimeHandler,
    DomainMealCreator,
    DomainMealGetter,
    DomainOrderHandler,
    DomainProjectCreator,
    DomainProjectGetter,
    DomainRatingCompiler,
    DomainRatingUpdater,
    DomainUserCreator,
    DomainUserGetter,
    DomainRecommendationGetter,
  ],
  exports: [
    DomainDatetimeHandler,
    DomainMealCreator,
    DomainMealGetter,
    DomainOrderHandler,
    DomainProjectCreator,
    DomainProjectGetter,
    DomainRatingCompiler,
    DomainRatingUpdater,
    DomainUserCreator,
    DomainUserGetter,
    DomainRecommendationGetter,
  ],
})
export class DomainModule {}
