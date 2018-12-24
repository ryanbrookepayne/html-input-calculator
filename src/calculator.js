import * as math from 'mathjs';

export default class Calculator {
  static calculate(expression) {
    return math.eval(expression);
  }
};
