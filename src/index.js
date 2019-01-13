import * as math from 'mathjs';

export default class InlineCalculator {
  constructor(userConfig) {
    const defaultConfig = {
      selector: '#inline-calculator',
      onCalculated: null,
      onError: null
    };

    this.config = Object.assign({}, defaultConfig, userConfig);

    this.input = document.querySelector(this.config.selector);
    this.input.addEventListener('keydown', this.inputHandler.bind(this), false);
  }

  inputHandler(event) {
    if (event.key !== 'Enter') return;

    try {
      const newValue = math.eval(this.input.value);
      this.input.value = newValue;
      if (this.config.onCalculated) {
        this.config.onCalculated(newValue);
      }
    } catch (error) {
      if (this.config.onError) {
        this.config.onError(error.toString());
      }
    }
  }
}
