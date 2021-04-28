const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// определение режима разработки
const isDev =process.env.NODE_ENV === 'development'
const isProd =!isDev
console.log(isProd);
console.log(isDev);
//  удаление хешей в зависимости от режима разработки(удаляем в режиме dev)
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
// функция для лоадеров js которая в режиме dev добавляет eslint
const jsLoaders =()=>{
  const loaders = ['babel-loader']
  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}
module.exports = {
  // source directory
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  // выходной файл
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  // алиасы и расшиерния
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'core': path.resolve(__dirname, 'src/core')
    }
  },
  // оригинальные исходники scss и т д
  devtool: isDev ? 'source-map' : false,
  // порт для сервера
  devServer: {
    port: 3000,
  },
  // плагины
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      // настройка для удаления пробелов,
      // комментов, а также минификация html в режиме prod.
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  // лоадеры scss и babel
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {publicPath: './'}
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ],
  }
}
