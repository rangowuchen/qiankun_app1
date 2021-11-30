/*
 * @Author: wuchen
 * @Date: 2021-11-29 14:08:25
 * @LastEditors: wuchen
 * @LastEditTime: 2021-11-29 17:26:34
 * @Description: 
 * @Email: rangowu@163.com
 */
const path = require('path');
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 6651;
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/child_app1' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
