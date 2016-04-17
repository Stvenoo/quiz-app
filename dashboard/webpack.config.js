const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  static: path.join(__dirname, 'static')
};
process.env.BABEL_ENV = TARGET;
const common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
   extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.static,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.static
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  }
};


// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',

    devServer: {
      outputPath: PATHS.static,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST,
      port: 8010
    },
    plugins: [
      new WriteFilePlugin({
        test: /^bundle.js$/
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'node_modules/html-webpack-template/index.ejs',
        title: 'dashboard',
        appMountId: 'app',
        inject: false
      })
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
