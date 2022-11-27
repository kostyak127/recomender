import { Injectable } from '@nestjs/common';
import { DataMealContract } from '../../../data/contract/data.meal.contract';
import { MealDto } from '../../../../dto/meal.dto';

@Injectable()
export class DomainMealCreator {
  public constructor(private readonly dataMealService: DataMealContract) {}
  public async createMeal(meal: MealDto): Promise<MealDto> {
    return this.dataMealService.create(meal);
  }
}
