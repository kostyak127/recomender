import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DbMealEntity } from './db.meal.entity';
import { DbProjectEntity } from '../project/db.project.entity';
import { Helper } from '../../../../utils/utils.helper';
import { ProjectDto } from '../../../../../dto/project.dto';
import { DayPart } from '../../../../../type/day-part.type';
import { Month } from '../../../../../type/month.type';
import { DbUserEntity } from '../user/db.user.entity';

@Injectable()
export class DbMealRepository extends Repository<DbMealEntity> {
  public async findById(
    externalId: DbMealEntity['externalId'],
    projectId: DbProjectEntity['id'],
  ): Promise<DbMealEntity | null> {
    return this.findOneBy({ id: Helper.getHex(externalId + projectId) });
  }
  public async createMeal(meal: DbMealEntity): Promise<DbMealEntity> {
    return this.insert(meal).then(() => meal);
  }
  public async getToRecommendByUser(
    project: ProjectDto,
    dayPart: DayPart,
    month: Month,
    userId: DbUserEntity['id'],
    limit: number,
  ): Promise<DbMealEntity[]> {
    return this.createQueryBuilder('meal')
      .innerJoin('rating', 'rating', 'rating.meal_id = meal.id')
      .where(
        'meal.project_id = :projectId AND rating.day_part = :dayPart AND rating.month = :month AND rating.user_id = :userId',
        { projectId: project.id, dayPart, month, userId },
      )
      .orderBy('rating.rank', 'DESC')
      .limit(limit)
      .getMany();
  }
  public async getToRecommendGeneral(
    project: ProjectDto,
    dayPart: DayPart,
    month: Month,
    limit: number,
  ): Promise<DbMealEntity[]> {
    return this.createQueryBuilder('meal')
      .innerJoin('rating', 'rating', 'rating.meal_id = meal.id')
      .where(
        'meal.project_id = :projectId AND rating.day_part = :dayPart AND rating.month = :month AND rating.user_id is null',
        { projectId: project.id, dayPart, month },
      )
      .orderBy('rating.rank', 'DESC')
      .limit(limit)
      .getMany();
  }
}
