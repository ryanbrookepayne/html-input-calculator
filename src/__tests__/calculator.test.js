import Calculator from '../calculator.js';

describe('Calculator', () => {
  describe('calculate', () => {
    it('should perform basic arithmetic', () => {
      expect(Calculator.calculate('2 + 2')).toBe(4);
      expect(Calculator.calculate('2 - 2')).toBe(0);
      expect(Calculator.calculate('2 * 2')).toBe(4);
      expect(Calculator.calculate('2 / 2')).toBe(1);
    });

    it('should log error with undefined symbols', () => {
      expect(Calculator.calculate('2 $ 2')).toBe(0);
    });
  });
});
