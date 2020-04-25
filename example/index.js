import InlineCalculator from "../src/index";

InlineCalculator.initialize({
  onError: error => {
    alert(error);
  }
});
