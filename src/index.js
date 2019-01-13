import * as math from 'mathjs';

export default class InlineCalculator {
  constructor(userConfig) {
    const defaultConfig = {
      selector: '#inline-calculator',
      onCalculated: function(val){},
      onError: function(err){}
    };

    this.config = Object.assign({}, defaultConfig, userConfig);
    this.input = document.querySelector(this.config.selector);
    this.input.addEventListener('keydown', this.inputHandler.bind(this), false);
  }

  inputHandler(event) {
    if (event.key !== 'Enter') return;

    try {
      const newValue = math.eval(this.input.value);
      this.config.onCalculated(newValue);
      this.input.value = newValue;
    } catch (err) {
      this.config.onError(err);
    }
  }
}
