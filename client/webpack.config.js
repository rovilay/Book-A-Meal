const path = require('path');
const webpack = require('webpack');
const DotEnv = require('dotenv-webpack');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'file-loader',
        query: {
          name: 'images/[hash].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'index.html'
    // }),
    new DotEnv(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 9000,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/public')
  },
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty'
  }
};
