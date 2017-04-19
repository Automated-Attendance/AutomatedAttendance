const nodeExternals = require('webpack-node-externals');
 
module.exports = {
  target: 'node',
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js?/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-decorators-legacy', 'transform-regenerator', 'transform-runtime'],
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  }
};