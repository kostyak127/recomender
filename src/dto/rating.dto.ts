import { DayPart } from '../type/day-part.type';
import { Month } from '../type/month.type';
import { UserDto } from './user.dto';
import { MealWithoutRating } from './meal.dto';

export type RatingDto = {
  id: string;
  dayPart: DayPart;
  month: Month;
  user: UserDto | null;
  rank: number;
  orderedTimes: number;
  meal: MealWithoutRating;
};
