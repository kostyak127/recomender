import { MealDto } from './meal.dto';

export type OrderItemDto = {
  mealId: MealDto['id'];
  price: number;
  quantity: number;
  name: string;
};
