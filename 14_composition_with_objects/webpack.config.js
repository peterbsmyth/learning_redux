module.exports = {
  entry: './src/composition_with_objects.js',
  output: {
    path: __dirname,
    filename: 'composition_with_objects.js'
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
