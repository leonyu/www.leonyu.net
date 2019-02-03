
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
    ]
  }
};
