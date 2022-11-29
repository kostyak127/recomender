import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { ApiOrderController } from './controller/api.order.controller';
import { ApiProjectController } from './controller/api.project.controller';
import { ApiRecommendationController } from './controller/api.recommendation.controller';

@Module({
  imports: [DomainModule],
  controllers: [
    ApiOrderController,
    ApiProjectController,
    ApiRecommendationController,
  ],
})
export class ApiModule {}
