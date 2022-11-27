import * as v4 from 'uuid';

export class Helper {
  static get UUID() {
    return v4.v4();
  }
}
