import * as math from 'mathjs';

export default class Calculator {
  static calculate(expression) {
    let calculation = 0;

    try {
      calculation = math.eval(expression);
    } catch (e) {
      console.error(e);
    }

    return calculation;
  }
};
