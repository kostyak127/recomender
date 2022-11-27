import { Injectable } from '@nestjs/common';
import { DataMealContract } from '../../../data/contract/data.meal.contract';
import { MealDto } from '../../../../dto/meal.dto';

@Injectable()
export class DomainMealGetter {
  public constructor(private readonly dataMealService: DataMealContract) {}

  public async getById(id: MealDto['id']): Promise<MealDto | null> {
    return this.dataMealService.getById(id);
  }
}
