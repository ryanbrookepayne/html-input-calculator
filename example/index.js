import InlineCalculator from '../src/index';

new InlineCalculator();

var calc2 = new InlineCalculator({
    selector: '#calc2',
    onError: function (err) {
        console.log('passed error', err)
    }
});