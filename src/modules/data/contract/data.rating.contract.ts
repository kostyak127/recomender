import { RatingDto } from '../../../dto/rating.dto';

export abstract class DataRatingContract {
  public abstract create(rating: RatingDto): Promise<RatingDto>;
  public abstract update(
    id: RatingDto['id'],
    toUpdate: Partial<RatingDto>,
  ): Promise<Partial<RatingDto>>;
}
