# Inline Calculator

An HTML inline input calculator for doing math in the browser. Inspired by the [YNAB budget calculator](https://docs.youneedabudget.com/article/1027-in-line-calculations).

**References**

* [YNAB budget calculator](https://docs.youneedabudget.com/article/1027-in-line-calculations)
* [mathjs](http://mathjs.org/)

## Usage

Add a text input to the DOM with an id of `inline-calculator`.

```html
<input type="text" id="inline-calculator">
```

Import and initialize the package.

```html
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

## Testing

This package uses [Jest](https://jestjs.io/en/) for unit testing.

```bash
yarn test
```
