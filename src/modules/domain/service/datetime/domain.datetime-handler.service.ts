import { Injectable } from '@nestjs/common';
import { OrderDto } from '../../../../dto/order.dto';
import { DayPart } from '../../../../type/day-part.type';
import { Month } from '../../../../type/month.type';

@Injectable()
export class DomainDatetimeHandler {
  public getMonthAndDayPartFromDeliveryDate(
    datetime: OrderDto['deliveryDatetime'],
  ): { dayPart: DayPart; month: Month } {
    return {
      month: this.getMonth(datetime),
      dayPart: this.getDayPart(datetime),
    };
  }
  private getMonth(datetime: OrderDto['deliveryDatetime']): Month {
    switch (datetime.getUTCMonth()) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        throw new Error('unknown month number');
    }
  }
  private getDayPart(datetime: OrderDto['deliveryDatetime']): DayPart {
    const hour = datetime.getHours();
    if (hour >= 5 && hour < 13) {
      return 'morning';
    } else if (hour >= 13 && hour < 18) {
      return 'day';
    } else if (hour >= 18 && hour < 24) {
      return 'evening';
    } else {
      return 'night';
    }
  }
}
