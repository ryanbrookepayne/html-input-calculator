import * as math from 'mathjs';
import InlineCalculator from '../index';
jest.mock('mathjs', () => {
  return {
    eval: jest.fn()
  };
});

describe('InlineCalculator', () => {
  let input;
  const selector = '#inline-calculator',
    submitInput = () => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter'
        })
      );
    },
    selectInput = () => {
      input.dispatchEvent(new CustomEvent('focus'));
    },
    deselectInput = () => {
      input.dispatchEvent(new CustomEvent('blur'));
    },
    cleanupEventListeners = () => {
      document.body.parentNode.replaceChild(
        document.body.cloneNode(true),
        document.body
      );
    };

  afterEach(() => {
    cleanupEventListeners();
  });

  describe('Default config', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="text" id="inline-calculator">';
      new InlineCalculator({ selector });
      input = document.querySelector(selector);
      input.value = '2 + 2';
      selectInput();
    });

    it('should do nothing when wrong key is pressed', () => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'f'
        })
      );

      expect(math.eval).not.toBeCalled();
      expect(input.value).toBe('2 + 2');
    });

    it('should update input value', () => {
      math.eval.mockReturnValueOnce(4);
      submitInput();

      expect(math.eval).toBeCalledWith('2 + 2');
      expect(input.value).toBe('4');
    });

    it('should throw an error when invalid characters are used', () => {
      input.value = 'a + b';
      math.eval.mockImplementation(() => {
        throw new Error('you dun goofed');
      });

      submitInput();
      expect(math.eval).toThrow('you dun goofed');
    });

    it('should not clear the input when calculating a non-calculation', () => {
      input.value = '4';
      submitInput();
      expect(input.value).toBe('4');
    });
  });

  describe('Custom selector', () => {
    it('should accept a custom selector', () => {
      document.body.innerHTML = '<input type="text" class="inline-calculator">';
      new InlineCalculator({
        selector: '.inline-calculator'
      });

      input = document.querySelector('.inline-calculator');
      input.value = '2 + 2';
      selectInput();
      math.eval.mockReturnValueOnce(4);

      submitInput();

      expect(math.eval).toBeCalledWith('2 + 2');
      expect(input.value).toBe('4');
    });
  });

  describe('onError callback', () => {
    it('should throw an error and fire the passed onError handler', () => {
      let onError = jest.fn();
      document.body.innerHTML = '<input type="text" id="inline-calculator">';
      new InlineCalculator({ onError });
      input = document.querySelector(selector);
      input.value = 'a + b';
      selectInput();
      math.eval.mockImplementation(() => {
        throw new Error('you dun goofed');
      });

      submitInput();

      expect(math.eval).toThrow('you dun goofed');
      expect(onError).toBeCalledWith('Error: you dun goofed');
    });
  });

  describe('onCalculated callback', () => {
    it('should fire the passed onCalculated handler', () => {
      let onCalculated = jest.fn();
      document.body.innerHTML = '<input type="text" id="inline-calculator">';
      new InlineCalculator({
        onCalculated
      });
      input = document.querySelector(selector);
      input.value = '1 + 2';
      selectInput();
      math.eval.mockReturnValueOnce('3');

      submitInput();

      expect(onCalculated).toBeCalledWith('3');
    });
  });

  describe('#initialize', () => {
    it('should initialize with the default attribute', () => {
      document.body.innerHTML =
        '<input type="text" inline-calculator><input type="text" inline-calculator>';
      let calculator = InlineCalculator.initialize();

      expect(calculator.config.selector).toBe('[inline-calculator]');
    });

    it('should attach to multiple inputs', () => {
      document.body.innerHTML =
        '<input type="text" id="one" inline-calculator><input id="two" type="text" inline-calculator>';
      InlineCalculator.initialize();

      const interactWithInput = (id) => {
        input = document.getElementById(id);
        input.value = '4 + 2';
        math.eval.mockReturnValueOnce('6');
        selectInput();
        input.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'Enter'
          })
        );
        expect(input.value).toBe('6');
        deselectInput();
      };

      interactWithInput('one');
      interactWithInput('two');
    });
  });
});
