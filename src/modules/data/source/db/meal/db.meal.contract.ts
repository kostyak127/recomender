import { MealDto } from '../../../../../dto/meal.dto';

export abstract class DbMealContract {
  public abstract getById(id: MealDto['id']): Promise<MealDto | null>;
}
