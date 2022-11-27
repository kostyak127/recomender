import { Injectable } from '@nestjs/common';
import { MealDto, PricedMealWithoutRating } from '../../../../dto/meal.dto';
import { DomainRatingCompiler } from './domain.rating-compiler.service';
import { UserDto } from '../../../../dto/user.dto';
import { Month } from '../../../../type/month.type';
import { DayPart } from '../../../../type/day-part.type';
import { DataRatingContract } from '../../../data/contract/data.rating.contract';

@Injectable()
export class DomainRatingUpdater {
  public constructor(
    private readonly ratingCompiler: DomainRatingCompiler,
    private readonly dataRatingService: DataRatingContract,
  ) {}
  public async updateMealRating(
    meal: MealDto,
    pricedMeal: PricedMealWithoutRating,
    user: UserDto,
    month: Month,
    dayPart: DayPart,
  ): Promise<MealDto> {
    const generalRatingIndex = meal.rating.findIndex(
      (r) => r.user === null && r.dayPart === dayPart && r.month === month,
    );
    const ratingForUserIndex = meal.rating.findIndex(
      (r) =>
        r.user?.id === user.id && r.dayPart === dayPart && r.month === month,
    );
    const { forUser, general } = this.ratingCompiler.compileRating(
      pricedMeal,
      meal,
      user,
      dayPart,
      month,
    );
    if (generalRatingIndex === -1) {
      meal.rating.push(general);
      await this.dataRatingService.create(general);
    } else {
      meal.rating[generalRatingIndex] = general;
      await this.dataRatingService.update(general.id, {
        rank: general.rank,
        orderedTime: general.orderedTime,
      });
    }
    if (ratingForUserIndex === -1) {
      meal.rating.push(forUser);
      await this.dataRatingService.create(forUser);
    } else {
      meal.rating[ratingForUserIndex] = forUser;
      await this.dataRatingService.update(forUser.id, {
        rank: forUser.rank,
        orderedTime: forUser.orderedTime,
      });
    }
    return meal;
  }
}
