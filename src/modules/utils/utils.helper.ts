import * as v4 from 'uuid';
import * as hash from 'hash.js';

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
}
