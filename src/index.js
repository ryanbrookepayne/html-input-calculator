import * as math from 'mathjs';

export default class InlineCalculator {
  static initialize(userConfig) {
    return new this(userConfig, {
      selector: '[inline-calculator]',
      onCalculated: null,
      onError: null
    });
  }

  constructor(
    userConfig,
    defaultConfig = {
      selector: '#inline-calculator',
      onCalculated: null,
      onError: null
    }
  ) {
    this.inputHandler = this.inputHandler.bind(this);
    this.attachInputListener = this.attachInputListener.bind(this);
    this.removeInputListener = this.removeInputListener.bind(this);

    this.config = Object.assign({}, defaultConfig, userConfig);
    document.body.addEventListener('focus', this.attachInputListener, true);
    document.body.addEventListener('blur', this.removeInputListener, true);
  }

  attachInputListener(event) {
    if (!event.target.matches(this.config.selector)) {
      return;
    }
    event.target.addEventListener('keydown', this.inputHandler);
  }

  removeInputListener(event) {
    if (!event.target.matches(this.config.selector)) {
      return;
    }
    event.target.removeEventListener('keydown', this.inputHandler);
  }

  inputHandler(event) {
    if (event.key !== 'Enter') return;

    try {
      const input = event.target;
      const newValue = math.eval(input.value);

      input.value = newValue;
      if (typeof this.config.onCalculated === 'function') {
        this.config.onCalculated(newValue);
      }
    } catch (error) {
      if (typeof this.config.onError === 'function') {
        this.config.onError(error.toString());
      }
    }
  }
}
