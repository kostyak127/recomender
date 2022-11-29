import { Injectable } from '@nestjs/common';
import { DataRatingContract } from '../contract/data.rating.contract';
import { RatingDto } from '../../../dto/rating.dto';
import { DbRatingMapper } from '../source/db/rating/db.rating-mapper.service';
import { DbRatingRepository } from '../source/db/rating/db.rating.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DbRatingEntity } from '../source/db/rating/db.rating.entity';
import { MealWithoutRating } from '../../../dto/meal.dto';
import { CacheService } from '../source/cache/cache.service';
import { Helper } from '../../utils/utils.helper';
import { DayPart } from '../../../type/day-part.type';
import { Month } from '../../../type/month.type';
import { DbUserEntity } from '../source/db/user/db.user.entity';
import { UserDto } from '../../../dto/user.dto';

@Injectable()
export class DataRatingService implements DataRatingContract {
  public constructor(
    private readonly ratingMapper: DbRatingMapper,
    @InjectRepository(DbRatingEntity)
    private readonly ratingRepo: DbRatingRepository,
    private readonly cacheService: CacheService,
  ) {}
  public async create(rating: RatingDto): Promise<RatingDto> {
    return this.ratingRepo
      .createRating(this.ratingMapper.mapToDb(rating))
      .then(() => this.cacheService.saveRating(rating));
  }

  public async update(
    id: RatingDto['id'],
    toUpdate: Partial<RatingDto>,
  ): Promise<Partial<RatingDto>> {
    return this.ratingRepo.updateRating(id, toUpdate).then(() => {
      return {
        id,
        ...toUpdate,
      };
    });
  }
  public async getMealRating(
    withoutRating: MealWithoutRating,
    user: UserDto & { dbId: DbUserEntity['id'] },
    dayPart: DayPart,
    month: Month,
  ): Promise<
    (Omit<RatingDto, 'meal' | 'user'> & {
      isUser: boolean;
      isGeneral: boolean;
    })[]
  > {
    const cached = await this.cacheService.getRating(
      withoutRating.id,
      withoutRating.project.id,
      user.dbId,
    );
    if (cached.length) {
      return cached.map((i) => {
        return {
          ...i,
          isGeneral: i.user === null,
          isUser: i.user !== null,
        };
      });
    }
    return this.ratingRepo
      .getCurrentByMealId(
        Helper.getHex(withoutRating.id + withoutRating.project.id),
        dayPart,
        month,
        user.dbId,
      )
      .then((l) => l.map((i) => this.ratingMapper.mapToDto(i)));
  }
}
