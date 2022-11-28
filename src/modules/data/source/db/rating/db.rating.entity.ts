import { Column, Entity } from 'typeorm';
import { DbBaseEntity } from '../db.base-entity';
import { DayPart } from '../../../../../type/day-part.type';
import { Month } from '../../../../../type/month.type';
import { DbMealEntity } from '../meal/db.meal.entity';
import { DbUserEntity } from '../user/db.user.entity';

@Entity({ name: 'rating' })
export class DbRatingEntity extends DbBaseEntity {
  public constructor(partial: Partial<DbRatingEntity>) {
    super();
    Object.assign(this, partial);
  }
  @Column({ name: 'day_part', type: 'varchar' })
  dayPart: DayPart;

  @Column({ name: 'month', type: 'varchar' })
  month: Month;

  @Column({ type: 'varchar', name: 'user_id' })
  userId: DbUserEntity['id'] | null;

  @Column({ name: 'rank', type: 'integer' })
  rank: number;

  @Column({ name: 'ordered_times', type: 'integer' })
  orderedTimes: number;

  @Column({ name: 'meal_id', type: 'varchar' })
  mealId: DbMealEntity['id'];
}
