import * as math from 'mathjs';
import Calculator from '../calculator.js';
jest.mock('mathjs', () => {
  return {
    eval: jest.fn()
  };
});

describe('Calculator', () => {
  describe('calculate', () => {
    it('should perform basic arithmetic', () => {
      math.eval.mockReturnValueOnce(4);
      const calc = Calculator.calculate('2 + 2');

      expect(math.eval).toBeCalledWith('2 + 2');
      expect(calc).toBe(4);
    });
  });
});
