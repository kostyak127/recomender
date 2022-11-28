import { Injectable } from '@nestjs/common';
import { RatingDto } from '../../../../../dto/rating.dto';
import { DbRatingEntity } from './db.rating.entity';
import { Helper } from '../../../../utils/utils.helper';

@Injectable()
export class DbRatingMapper {
  public mapToDb(rating: RatingDto): DbRatingEntity {
    return new DbRatingEntity({
      id: rating.id,
      mealId: Helper.getHex(rating.meal.id + rating.meal.project.id),
      dayPart: rating.dayPart,
      month: rating.month,
      rank: rating.rank,
      orderedTimes: rating.orderedTimes,
      userId: rating.user
        ? Helper.getHex(rating.user.id + rating.user.project.id)
        : null,
    });
  }
  public mapToDto(db: DbRatingEntity): Omit<RatingDto, 'meal' | 'user'> & {
    mealId: string;
    isUser: boolean;
    isGeneral: boolean;
  } {
    return {
      dayPart: db.dayPart,
      id: db.id,
      mealId: db.mealId,
      month: db.month,
      orderedTimes: db.orderedTimes,
      rank: db.rank,
      isUser: db.userId !== null,
      isGeneral: db.userId === null,
    };
  }
  public partialMapToDb(partial: Partial<RatingDto>): Partial<DbRatingEntity> {
    return new DbRatingEntity({
      rank: partial.rank,
      orderedTimes: partial.orderedTimes,
    });
  }
}
