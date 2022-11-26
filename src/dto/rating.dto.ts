import { DayPart } from '../type/day-part.type';
import { Month } from '../type/month.type';
import { UserDto } from './user.dto';

export type RatingDto = {
  dayPart: DayPart;
  month: Month;
  rank: number;
  user: UserDto;
};
