# Inline Calculator

[![npm version](https://badge.fury.io/js/inline-calculator.svg)](https://badge.fury.io/js/inline-calculator)

An HTML inline input calculator for doing math in the browser. Inspired by the [YNAB budget calculator](https://docs.youneedabudget.com/article/1027-in-line-calculations). Math calculations are computed using [mathjs](http://mathjs.org/).

![](./demo.gif)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
#### Table of Contents

- [Usage](#usage)
- [Configuration](#configuration)
  - [Selector](#selector)
  - [Hooks](#hooks)
    - [onCalculated](#oncalculated)
    - [onError](#onerror)
- [Contributing](#contributing)
  - [Getting Start](#getting-start)
  - [Example](#example)
  - [Testing](#testing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

Install the package.

```bash
# Yarn
yarn add inline-calculator

# NPM
npm i inline-calculator
```

Create a text input with an id of `inline-calculator`.

```html
<input type="text" id="inline-calculator">
```

Import and initialize the constructor.

```js
import InlineCalculator from 'inline-calculator';

new InlineCalculator();
```

When users enter a mathematical expression and press the enter key, the input's value will update with the return value of the expression.

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

Override the default id (`#inline-calculator`) selector. The event listener uses [`Document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) so you can pass any type of selector you want.

```html
<input type="text" class="my-custom-class">
```

```js
import InlineCalculator from 'inline-calculator';

new InlineCalculator({
  selector: '.my-custom-class'
});
```

### Hooks

#### onCalculated

The `onCalculated` hook is called directly after the calculation.

```js
import InlineCalculator from 'inline-calculator';

new InlineCalculator({
  onCalculated: function(value) {
    alert(`Your new value is ${value}`);
  }
});
```

#### onError

The `onError` hook is called when [mathjs](http://mathjs.org/) throws an exception.

```js
import InlineCalculator from 'inline-calculator';

new InlineCalculator({
  onError: function (error) {
    alert(`Oops! Something went wrong. ${error}`);
  }
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
