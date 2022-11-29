import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DomainProjectGetter } from '../../domain/service/project/domain.project-getter.service';
import { Helper } from '../../utils/utils.helper';
import { DomainDatetimeHandler } from '../../domain/service/datetime/domain.datetime-handler.service';
import { DomainRecommendationGetter } from '../../domain/service/recommendation/domain.recommendation-getter.service';
import { ApiMealResponseModel } from '../model/api.meal.response.model';

@ApiTags('recommendation')
@Controller('recommendation')
export class ApiRecommendationController {
  public constructor(
    private readonly projectGetter: DomainProjectGetter,
    private readonly datetimeHandler: DomainDatetimeHandler,
    private readonly recommendationGetter: DomainRecommendationGetter,
  ) {}
  @ApiOperation({ summary: 'get recommended meals' })
  @ApiOkResponse({
    description: 'success',
    type: ApiMealResponseModel,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'not valid credentials' })
  @Get()
  public async getRecommendation(
    @Headers('authorization') token: string,
    @Query('deliveryDatetime') deliveryDatetime: Date,
    @Query('userId') userId?: string,
  ): Promise<ApiMealResponseModel[]> {
    if (!token) {
      throw new UnauthorizedException('token not passed in headers');
    }
    const project = await this.projectGetter.getByToken(token);
    if (project === null) {
      throw new UnauthorizedException('access token not registered');
    }
    if (!deliveryDatetime) {
      throw new BadRequestException('deliveryDatetime not passed');
    }
    if (isNaN(deliveryDatetime.getTime())) {
      throw new BadRequestException('deliveryDatetime is invalid');
    }
    if (deliveryDatetime.getDate() <= 7) {
      deliveryDatetime = Helper.AddDays(
        deliveryDatetime,
        deliveryDatetime.getDate(),
      );
    }
    const { dayPart, month } =
      this.datetimeHandler.getMonthAndDayPartFromDeliveryDate(deliveryDatetime);
    return this.recommendationGetter
      .getMealsToRecommend(userId || null, project, dayPart, month)
      .then((res) =>
        res.map((meal) => {
          return {
            id: meal.id,
            name: meal.name,
          };
        }),
      );
  }
}
