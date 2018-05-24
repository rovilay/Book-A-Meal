const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name]_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/, 
        query: {
          presets: ['es6', ]
        }
      },
    ]
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/assets/index.html',
      chunks: ['main'],
      filename: './index.html'
    })
  ],
  devServer: {
    port: 9000
  }
};
