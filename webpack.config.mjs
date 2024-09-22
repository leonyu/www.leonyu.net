
import path from 'node:path';
import { env } from 'node:process';

export default {
  mode: env.NODE_ENV == 'production' ? 'production' : 'development',
  entry: './src/',
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
    ],
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(import.meta.dirname, 'dist'),
  },
};
