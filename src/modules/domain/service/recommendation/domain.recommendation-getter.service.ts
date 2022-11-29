import { Injectable } from '@nestjs/common';
import { DataMealContract } from '../../../data/contract/data.meal.contract';
import { ProjectDto } from '../../../../dto/project.dto';
import { MealWithoutRating } from '../../../../dto/meal.dto';
import { DomainUserGetter } from '../user/domain.user-getter.service';
import { DayPart } from '../../../../type/day-part.type';
import { Month } from '../../../../type/month.type';

@Injectable()
export class DomainRecommendationGetter {
  public constructor(
    private readonly dataMealService: DataMealContract,
    private readonly userGetter: DomainUserGetter,
  ) {}
  public async getMealsToRecommend(
    userId: string | null,
    project: ProjectDto,
    dayPart: DayPart,
    month: Month,
  ): Promise<MealWithoutRating[]> {
    const user =
      userId === null
        ? null
        : await this.userGetter.getUserById(userId, project);
    const generalToRecommend = await this.dataMealService.getGeneralToRecommend(
      project,
      dayPart,
      month,
      20,
    );
    if (user === null) {
      return generalToRecommend;
    }
    const userRecommendation =
      await this.dataMealService.getToRecommendByUserId(
        project,
        dayPart,
        month,
        user.id,
        20,
      );
    const result: MealWithoutRating[] = [...userRecommendation];
    const resultIds: string[] = userRecommendation.map((i) => i.id);
    for (const meal of generalToRecommend) {
      if (!resultIds.includes(meal.id)) {
        result.push(meal);
      }
    }
    return result;
  }
}
