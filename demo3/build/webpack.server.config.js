const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const resolve = dir => path.resolve(__dirname, dir)
module.exports = merge(baseConfig, {
  entry: resolve('../src/entry-server.js'),
  // 此处告知 server bundle 使用Node风格导出模块(Node-style exports)
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].server.js'
  },
  target: 'node',
  devtool: 'source-map',
  mode: 'production',
  /*
   服务器端也需要编译样式，不能使用 mini-css-extract-plugin 插件
   ，因为该插件会使用document，但是服务器端并没有document, 因此会导致打包报错，我们可以如下的issues:
   https://github.com/webpack-contrib/mini-css-extract-plugin/issues/48#issuecomment-375288454
  */
  module: {
    rules: [{
      test: /\.styl(us)?$/,
      use: ['css-loader', 'stylus-loader']
    }]
  },
  /**
   * https://webpack.js.org/configuration/externals/#function
   * https://github.com/liady/webpack-node-externals
   * 置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的 bundle 文件。
   */
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  /**
   * 这是将服务器的整个输出,构建为单个 JSON 文件的插件。
   * 默认文件名为 `vue-ssr-server-bundle.json`
   */
  plugins: [
    new VueSSRServerPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    })
  ]
})
