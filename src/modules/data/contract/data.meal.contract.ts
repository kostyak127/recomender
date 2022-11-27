import { MealDto } from '../../../dto/meal.dto';

export abstract class DataMealContract {
  public abstract getById(id: MealDto['id']): Promise<MealDto | null>;
  public abstract create(meal: MealDto): Promise<MealDto>;
}
