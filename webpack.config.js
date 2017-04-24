const path = require('path');
const SRC_DIR = path.join(__dirname, '/src/public');
const DIST_DIR = path.join(__dirname, '/src/public/dist');


module.exports = {
  entry: ['babel-polyfill', `${SRC_DIR}/AppEntry.js`],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-decorators-legacy', 'transform-regenerator'],
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /(\.scss$)/,
        loaders: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'compressed',
            includePaths: ['./node_modules']
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            }
          },
          'postcss-loader' // has separate config, see postcss.config.js nearby
        ]
      },
    ]
  }
};