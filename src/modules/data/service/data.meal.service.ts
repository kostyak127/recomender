import { Injectable } from '@nestjs/common';
import { DataMealContract } from '../contract/data.meal.contract';
import { MealDto, MealWithoutRating } from '../../../dto/meal.dto';
import { DbMealRepository } from '../source/db/meal/db.meal.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DbMealEntity } from '../source/db/meal/db.meal.entity';
import { CacheService } from '../source/cache/cache.service';
import { ProjectDto } from '../../../dto/project.dto';
import { DayPart } from '../../../type/day-part.type';
import { Month } from '../../../type/month.type';
import { DbMealMapper } from '../source/db/meal/db.meal-mapper.service';
import { DataRatingService } from './data.rating.service';
import { UserDto } from '../../../dto/user.dto';
import { DataUserService } from './data.user.service';
import { RatingDto } from '../../../dto/rating.dto';

@Injectable()
export class DataMealService implements DataMealContract {
  public constructor(
    @InjectRepository(DbMealEntity)
    private readonly dbMealRepo: DbMealRepository,
    private readonly cacheService: CacheService,
    private readonly mealMapper: DbMealMapper,
    private readonly dataRatingService: DataRatingService,
    private readonly dataUserService: DataUserService,
  ) {}
  create(meal: MealDto): Promise<MealDto> {
    return this.dbMealRepo
      .createMeal(new DbMealEntity(meal))
      .then((m) => {
        return {
          id: m.id,
          name: m.name,
          rating: meal.rating,
          project: meal.project,
        };
      })
      .then(() => this.cacheService.saveMeal(meal));
  }

  public async getWithCurrentRatingById(
    id: MealDto['id'],
    project: ProjectDto,
    dayPart: DayPart,
    month: Month,
    userExternalId: UserDto['id'],
  ): Promise<MealDto | null> {
    const cached = await this.cacheService.getMealByIdAndProjectId(
      id,
      project.id,
    );
    if (cached !== null) {
      return cached;
    }
    const database: MealWithoutRating | null = await this.dbMealRepo
      .findById(id, project.id)
      .then((db) => (db === null ? db : this.mealMapper.mapToDto(db)))
      .then((m) => {
        return m === null ? m : { ...m, project: project };
      });

    if (database === null) {
      return null;
    }
    const user = await this.dataUserService.getById(userExternalId, project);
    if (user === null) {
      throw new Error('UNKNOWN USER');
    }
    const rating: RatingDto[] = await this.dataRatingService
      .getMealRating({ ...database, project: project }, user, dayPart, month)
      .then((l) =>
        l.map((i) => {
          if (i.isUser) {
            return {
              ...i,
              user,
              meal: database,
            };
          } else {
            return {
              ...i,
              user: null,
              meal: database,
            };
          }
        }),
      );
    await Promise.all(rating.map((i) => this.cacheService.saveRating(i)));
    const withRating: MealDto = {
      ...database,
      rating: rating,
    };
    await this.cacheService.saveMeal(withRating);
    return withRating;
  }
}
