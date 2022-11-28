import { Injectable } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { DbRatingEntity } from './db.rating.entity';
import { DbMealEntity } from '../meal/db.meal.entity';
import { DayPart } from '../../../../../type/day-part.type';
import { Month } from '../../../../../type/month.type';
import { DbUserEntity } from '../user/db.user.entity';

@Injectable()
export class DbRatingRepository extends Repository<DbRatingEntity> {
  public async getCurrentByMealId(
    mealId: DbMealEntity['id'],
    dayPart: DayPart,
    month: Month,
    userId: DbUserEntity['id'],
  ): Promise<DbRatingEntity[]> {
    return this.findBy([
      {
        mealId,
        month,
        dayPart,
        userId: userId,
      },
      {
        mealId,
        month,
        dayPart,
        userId: IsNull(),
      },
    ]);
  }
  public async updateRating(
    ratingId: DbRatingEntity['id'],
    toUpdate: Partial<DbRatingEntity>,
  ): Promise<Partial<DbRatingEntity>> {
    return this.update(ratingId, toUpdate).then(
      () => new DbRatingEntity({ id: ratingId, ...toUpdate }),
    );
  }
  public async createRating(rating: DbRatingEntity): Promise<DbRatingEntity> {
    return this.insert(rating).then(() => rating);
  }
}
