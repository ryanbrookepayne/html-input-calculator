import * as math from 'mathjs';

export default class InlineCalculator {
  constructor(userConfig) {
    let input;
    const defaultConfig = {
      selector: '#inline-calculator'
    };
    const config = Object.assign(defaultConfig, userConfig);

    input = document.querySelector(config.selector);
    input.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;

      input.value = math.eval(input.value);
    });
  }
}
