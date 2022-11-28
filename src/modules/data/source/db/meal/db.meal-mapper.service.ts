import { Injectable } from '@nestjs/common';
import { MealDto } from '../../../../../dto/meal.dto';
import { DbMealEntity } from './db.meal.entity';
import { Helper } from '../../../../utils/utils.helper';
import { DbProjectEntity } from '../project/db.project.entity';

@Injectable()
export class DbMealMapper {
  public mapToDb(dto: MealDto): DbMealEntity {
    return new DbMealEntity({
      id: Helper.getHex(dto.id + dto.project.id),
      name: dto.name,
      externalId: dto.id,
      projectId: dto.project.id,
    });
  }
  public mapToDto(db: DbMealEntity): Omit<MealDto, 'rating' | 'project'> & {
    projectId: DbProjectEntity['id'];
  } {
    return {
      id: db.externalId,
      name: db.name,
      projectId: db.projectId,
    };
  }
}
