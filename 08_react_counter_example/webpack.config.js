module.exports = {
  entry: './src/react_counter_example.js',
  output: {
    path: __dirname,
    filename: 'react_counter_example.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
}
