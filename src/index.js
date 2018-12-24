import * as math from 'mathjs';

export default class InlineCalculator {
  constructor() {
    let input = document.getElementById('inline-calculator');
    input.addEventListener('keydown', () => {
      input.value = math.eval(input.value);
    });
  }
}
