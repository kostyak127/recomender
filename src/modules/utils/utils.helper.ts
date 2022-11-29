import * as v4 from 'uuid';
import * as hash from 'hash.js';
import * as momentTz from 'moment-timezone';
import { parseISO } from 'date-fns';

export class Helper {
  static get UUID() {
    return v4.v4();
  }
  static MinutesInSeconds(minutes: number): number {
    return minutes * 60;
  }
  static getHex(str: string): string {
    return hash.sha256().update(str).digest('hex');
  }
  static removeEmptyValues<T>(list: (T | null | undefined)[]): T[] {
    return list.filter((i) => i !== null && i !== undefined) as T[];
  }
  public static AddDays(date: Date, amount: number): Date {
    return this.Moment(date).add(amount, 'days').toDate();
  }
  public static Moment(input?: any) {
    let date = input;

    if (typeof date === 'number') {
      return momentTz.unix(date);
    }
    if (typeof date === 'string') {
      date = parseISO(date);
    }

    return momentTz(date);
  }
}
