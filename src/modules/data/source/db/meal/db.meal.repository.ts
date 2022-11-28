import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DbMealEntity } from './db.meal.entity';
import { DbProjectEntity } from '../project/db.project.entity';
import { Helper } from '../../../../utils/utils.helper';

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
}
