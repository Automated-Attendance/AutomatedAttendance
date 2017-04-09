const path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'src/public/*.js': ['webpack', 'sourcemap'],
      'src/public/components/*.js': ['webpack', 'sourcemap'],
      'test/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
              plugins: ['transform-decorators-legacy', 'transform-regenerator'],
              presets: ['react', 'es2015', 'stage-1']
            }
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true
    },

    // plugins: [
    //   'karma-webpack',
    //   'karma-jasmine',
    //   'karma-sourcemap-loader',
    //   'karma-chrome-launcher',
    //   'karma-phantomjs-launcher',
    //   'karma-babel-preprocessor'
    // ],


    babelPreprocessor: {
      options: {
        plugins: ['transform-decorators-legacy', 'transform-regenerator'],
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
  });
};