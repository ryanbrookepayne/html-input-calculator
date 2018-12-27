# Inline Calculator

An HTML inline input calculator for doing math in the browser. Inspired by the [YNAB budget calculator](https://docs.youneedabudget.com/article/1027-in-line-calculations). Math calculations are computed using [mathjs](http://mathjs.org/).

![](./demo.gif)

## Usage

Add a text input to the DOM with an id of `inline-calculator`.

```html
<input type="text" id="inline-calculator">
```

Import and initialize the package.

```js
import InlineCalculator from 'inline-calculator';

new InlineCalculator();
```

When the user enters a mathematical expression and presses the enter key, the input's value will update with the return value of the expression.

**For Example:**

```
2 + 2
```

Will return:

```
4
```

## Configuration

### Selector

Override the default id (`#inline-calculator`) selector. The method uses [`Document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) so you can pass any type of selector you want.

```html
<input type="text" class="my-custom-class">
```

```js
import InlineCalculator from 'inline-calculator';

new InlineCalculator({
  selector: '.my-custom-class'
});
```

## Contributing

### Getting Start

Install dependencies with [Yarn](https://yarnpkg.com/en/).

```bash
yarn install
```

### Example

To see an example of the inline calculator in action, run the [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server). Webpack will open <http://localhost:8080/> in your browser.

```bash
yarn start
```

### Testing

This package uses [Jest](https://jestjs.io/en/) for unit testing.

```bash
yarn test
```
