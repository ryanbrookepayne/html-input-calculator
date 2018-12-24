/* global jest, describe, expect */
import * as math from 'mathjs';
import InlineCalculator from '../index';
jest.mock('mathjs', () => {
  return {
    eval: jest.fn()
  };
});

describe('InlineCalculator', () => {
  beforeAll(() => {
    document.body.innerHTML = '<input type="text" id="inline-calculator">';
  });

  it('should update input value', () => {
    new InlineCalculator();
    let input = document.getElementById('inline-calculator');
    math.eval.mockReturnValueOnce(4);

    input.value = '2 + 2';
    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
    }));

    expect(math.eval).toBeCalledWith('2 + 2');
    expect(input.value).toBe("4");
  });
});
