import { Injectable } from '@nestjs/common';
import { MealDto, PricedMealWithoutRating } from '../../../../dto/meal.dto';
import { DayPart } from '../../../../type/day-part.type';
import { Month } from '../../../../type/month.type';
import { RatingDto } from '../../../../dto/rating.dto';
import { UserDto } from '../../../../dto/user.dto';
import * as _ from 'lodash';
import { Helper } from '../../../utils/utils.helper';

@Injectable()
export class DomainRatingCompiler {
  public constructor() {}
  public compileRating(
    pricedMealWithoutRating: PricedMealWithoutRating,
    innerMealWithRating: MealDto,
    user: UserDto,
    nowDayPart: DayPart,
    nowMonth: Month,
  ): { general: RatingDto; forUser: RatingDto } {
    return {
      general: this.compileGeneralRating(
        innerMealWithRating,
        pricedMealWithoutRating,
        nowDayPart,
        nowMonth,
      ),
      forUser: this.compileUserRating(
        innerMealWithRating,
        user,
        pricedMealWithoutRating,
        nowDayPart,
        nowMonth,
      ),
    };
  }
  private compileUserRating(
    inner: MealDto,
    user: UserDto,
    pricedMealWithoutRating: PricedMealWithoutRating,
    dayPart: DayPart,
    month: Month,
  ): RatingDto {
    const userRating = inner.rating.find(
      (r) =>
        r.user?.id !== user.id && r.month === month && r.dayPart === r.dayPart,
    );
    if (!userRating) {
      return {
        id: Helper.UUID,
        dayPart,
        month,
        orderedTimes: 1,
        rank: pricedMealWithoutRating.price,
        user,
        meal: _.omit(pricedMealWithoutRating, ['price']),
      };
    } else {
      return {
        id: userRating.id,
        dayPart,
        month,
        orderedTimes: userRating.orderedTimes + 1,
        rank: userRating.rank + pricedMealWithoutRating.price,
        user,
        meal: _.omit(pricedMealWithoutRating, ['price']),
      };
    }
  }
  private compileGeneralRating(
    inner: MealDto,
    pricedMealWithoutRating: PricedMealWithoutRating,
    dayPart: DayPart,
    month: Month,
  ): RatingDto {
    const general = inner.rating.find(
      (r) => r.user === null && r.month === month && r.dayPart === r.dayPart,
    );
    if (!general) {
      return {
        id: Helper.UUID,
        dayPart,
        month,
        orderedTimes: 1,
        rank: pricedMealWithoutRating.price,
        user: null,
        meal: _.omit(pricedMealWithoutRating, ['price']),
      };
    } else {
      return {
        id: general.id,
        dayPart,
        month,
        orderedTimes: general.orderedTimes + 1,
        rank: general.rank + pricedMealWithoutRating.price,
        user: null,
        meal: _.omit(pricedMealWithoutRating, ['price']),
      };
    }
  }
}
