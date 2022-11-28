import { MealDto } from '../../../dto/meal.dto';
import { ProjectDto } from '../../../dto/project.dto';
import { DayPart } from '../../../type/day-part.type';
import { Month } from '../../../type/month.type';
import { UserDto } from '../../../dto/user.dto';

export abstract class DataMealContract {
  public abstract getWithCurrentRatingById(
    id: MealDto['id'],
    project: ProjectDto,
    dayPart: DayPart,
    month: Month,
    userId: UserDto['id'],
  ): Promise<MealDto | null>;
  public abstract create(meal: MealDto): Promise<MealDto>;
}
