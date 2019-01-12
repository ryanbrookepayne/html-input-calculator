import InlineCalculator from '../src/index';

new InlineCalculator({
  onError: (error) => {
    alert(error);
  }
});
