import { Injectable } from '@nestjs/common';
import { DataMealContract } from '../../../data/contract/data.meal.contract';
import { MealDto } from '../../../../dto/meal.dto';
import { ProjectDto } from '../../../../dto/project.dto';
import { DayPart } from '../../../../type/day-part.type';
import { Month } from '../../../../type/month.type';
import { UserDto } from '../../../../dto/user.dto';

@Injectable()
export class DomainMealGetter {
  public constructor(private readonly dataMealService: DataMealContract) {}

  public async getWithCurrentRatingById(
    id: MealDto['id'],
    project: ProjectDto,
    dayPart: DayPart,
    month: Month,
    userId: UserDto['id'],
  ): Promise<MealDto | null> {
    return this.dataMealService.getWithCurrentRatingById(
      id,
      project,
      dayPart,
      month,
      userId,
    );
  }
}
