const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'slider.js',
    library: 'sliderjs',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: './',
    publicPath: '/dist/',
    hot: true,
    overlay: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  node: {
    fs: 'empty'
  }
}
