import { Injectable } from '@nestjs/common';
import { OrderDto } from '../../../../dto/order.dto';
import { DomainDatetimeHandler } from '../datetime/domain.datetime-handler.service';
import { DomainRatingUpdater } from '../rating/domain.rating-updater.service';
import { DomainMealGetter } from '../meal/domain.meal-getter.service';
import { DomainMealCreator } from '../meal/domain.meal-creator.service';
import { DomainUserGetter } from '../user/domain.user-getter.service';
import { DomainUserCreator } from '../user/domain.user-creator.service';
import { Config } from 'src/modules/config/config.variable-getter.service';

@Injectable()
export class DomainOrderHandler {
  public constructor(
    private readonly datetimeHandler: DomainDatetimeHandler,
    private readonly ratingUpdater: DomainRatingUpdater,
    private readonly mealGetter: DomainMealGetter,
    private readonly mealCreator: DomainMealCreator,
    private readonly userGetter: DomainUserGetter,
    private readonly userCreator: DomainUserCreator,
  ) {}
  public async handleOrder(order: OrderDto): Promise<void> {
    const { dayPart, month } =
      this.datetimeHandler.getMonthAndDayPartFromDeliveryDate(
        order.deliveryDatetime,
      );
    const user = await this.userGetter
      .getUserById(order.userId, order.project)
      .then(
        (u) =>
          u ||
          this.userCreator.createUser({
            id: order.userId,
            project: order.project,
          }),
      );
    const mealsToCompileRating = await Promise.all(
      order.items.filter((item) => Config.MIN_MEAL_PRICE_FOR_RECOMMEND === null || item.price > Config.MIN_MEAL_PRICE_FOR_RECOMMEND)
      .map(async (item) => {
        const innerMeal = await this.mealGetter
          .getWithCurrentRatingById(
            item.mealId,
            order.project,
            dayPart,
            month,
            user.id,
          )
          .then(
            (m) =>
              m ||
              this.mealCreator.createMeal({
                id: item.mealId,
                name: item.name,
                project: order.project,
                rating: [],
              }),
          );
        const pricedMeal = {
          ...innerMeal,
          price: item.price,
          quantity: item.quantity,
        };
        return { inner: innerMeal, priced: pricedMeal };
      }),
    );
    await Promise.all(
      mealsToCompileRating.map((m) =>
        this.ratingUpdater.updateMealRating(
          m.inner,
          m.priced,
          user,
          month,
          dayPart,
        ),
      ),
    );
  }
}
