const path = require('path');

module.exports = {
  mode: 'development',
  entry: './example/index.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
