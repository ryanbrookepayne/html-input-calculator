import * as math from 'mathjs';

export default class InlineCalculator {
  constructor() {
    let input = document.getElementById('inline-calculator');
    input.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;

      input.value = math.eval(input.value);
    });
  }
}
