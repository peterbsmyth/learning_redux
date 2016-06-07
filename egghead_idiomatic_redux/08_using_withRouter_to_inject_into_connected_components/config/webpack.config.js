const path = require('path');
const webpack = require('webpack');


const PATHS = {
  app: path.resolve(__dirname, '../src/js'),
  build: path.resolve(__dirname, '../build')
};


module.exports = {
  entry: {
    app: path.resolve(PATHS.app, 'index.js')
  },
  output: {
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot','babel'],
        include: PATHS.app
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    port: 3000
  }
}
