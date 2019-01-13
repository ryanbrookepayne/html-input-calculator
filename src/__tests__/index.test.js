import * as math from 'mathjs';
import InlineCalculator from '../index';
jest.mock('mathjs', () => {
  return {
    eval: jest.fn()
  };
});

describe('InlineCalculator', () => {
  describe('Default config', () => {
    let input;

    beforeEach(() => {
      document.body.innerHTML = '<input type="text" id="inline-calculator">';
      new InlineCalculator();
      input = document.querySelector('#inline-calculator');
      input.value = '2 + 2';
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

      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter'
        })
      );

      expect(math.eval).toBeCalledWith('2 + 2');
      expect(input.value).toBe('4');
    });

    it('should throw an error when invalid characters are used', () => {
      input.value = 'a + b';
      math.eval.mockImplementation(() => {
        throw new Error('you dun goofed');
      });

      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter'
        })
      );

      expect(math.eval).toThrow('you dun goofed');
    });
  });

  describe('Custom selector', () => {
    it('should accept a custom selector', () => {
      let input;
      document.body.innerHTML = '<input type="text" class="inline-calculator">';
      new InlineCalculator({
        selector: '.inline-calculator'
      });
      input = document.querySelector('.inline-calculator');
      input.value = '2 + 2';
      math.eval.mockReturnValueOnce(4);

      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter'
        })
      );

      expect(math.eval).toBeCalledWith('2 + 2');
      expect(input.value).toBe('4');
    });
  });

  describe('onError callback', () => {
    it('should throw an error and fire the passed onError handler', () => {
      let input;
      let onErrorCallback = jest.fn();
      document.body.innerHTML = '<input type="text" id="inline-calculator">';
      new InlineCalculator({
        onError: onErrorCallback
      });
      input = document.querySelector('#inline-calculator');
      input.value = 'a + b';
      math.eval.mockImplementation(() => {
        throw new Error('you dun goofed');
      });

      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter'
        })
      );

      expect(math.eval).toThrow('you dun goofed');
      expect(onErrorCallback).toBeCalledWith('Error: you dun goofed');
    });
  });

  describe('onCalculated callback', () => {
    it('should fire the passed onCalculated handler', () => {
      let input;
      let onCalculatedCallback = jest.fn();
      document.body.innerHTML = '<input type="text" id="inline-calculator">';
      new InlineCalculator({
        onCalculated: onCalculatedCallback
      });
      input = document.querySelector('#inline-calculator');
      input.value = 'a + b';
      math.eval.mockReturnValueOnce('hello there');

      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter'
        })
      );

      expect(onCalculatedCallback).toBeCalledWith('hello there');
    });
  });
});
