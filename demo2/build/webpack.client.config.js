const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// const resolve = path =>
module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[id].[chunkhash].js'
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[id].[contenthash].css'
    }),
    //  当vendor模块不再改变时, 根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    new VueSSRClientPlugin()
  ]
})

