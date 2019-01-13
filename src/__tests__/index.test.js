/* global jest, describe, expect */
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

    it('should do nothing', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'f',
      }));

      expect(math.eval).not.toBeCalled();
      expect(input.value).toBe('2 + 2');
    });

    it('should update input value', () => {
      math.eval.mockReturnValueOnce(4);

      input.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
      }));

      expect(math.eval).toBeCalledWith('2 + 2');
      expect(input.value).toBe('4');
    });
  });

  describe('Custom selector', () => {
    let input;

    beforeEach(() => {
      document.body.innerHTML = '<input type="text" class="inline-calculator">';
      new InlineCalculator({
        selector: '.inline-calculator'
      });
      input = document.querySelector('.inline-calculator');
      input.value = '2 + 2';
    });

    it('should accept a custom selector', () => {
      math.eval.mockReturnValueOnce(4);

      input.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
      }));

      expect(math.eval).toBeCalledWith('2 + 2');
      expect(input.value).toBe('4');
    });
  });

  describe('Custom Hooks', () => {
    let input;
    let onErrorhasBeenCalled = false;
    let onErrorValue = null;
    let onCalculatedHasBeenCalled = false;
    let onCalculatedValue = null;

    beforeEach(() => {
      document.body.innerHTML = '<input type="text" id="inline-calculator">';
      new InlineCalculator({
        onError: function (error) {
          onErrorhasBeenCalled = true;
          onErrorValue = error;
        },
        onCalculated: function (val) {
          onCalculatedHasBeenCalled = true;
          onCalculatedValue = val;
        }
      });

      input = document.querySelector('#inline-calculator');
      input.value = 'a + b';
    });

    it('should throw an error and fire the passed onError handler', () => {
      math.eval.mockImplementation(() => {
        throw new Error('you dun goofed');
      });

      input.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
      }));

      expect(math.eval).toBeCalledWith('a + b');
      expect(math.eval).toThrow('you dun goofed');
      expect(onErrorhasBeenCalled).toBe(true);
      expect(onErrorValue.toString()).toEqual('Error: you dun goofed');
    });

    it('should fire the passed onCalculated handler', () => {
      math.eval.mockReturnValueOnce('hello there');

      input.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
      }));

      expect(onCalculatedHasBeenCalled).toBe(true);
      expect(onCalculatedValue).toEqual('hello there');
    });
  });
});
