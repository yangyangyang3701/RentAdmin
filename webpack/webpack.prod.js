const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const commonConfig = require('./webpack.common');

let config = merge(commonConfig, {
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: 'chunk/[id].[contenthash:8].css',
    }),
    new webpack.ids.HashedModuleIdsPlugin(),
  ],
  performance: {
    maxEntrypointSize: 250000,
    maxAssetSize: 250000,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true, // 多进程压缩
        terserOptions: {
          output:{
            comments: false, // 去掉注释内容
          },
          compress: {
            pure_funcs: [ // 删除console.log
              "console.log",
              "debugger"
            ]
          }
        },
        extractComments: true, //将注释剥离到单独的文件中
      })
    ],
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all', // 默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      cacheGroups: {
        dll: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|babel-polyfill|@reduxjs|redux)/,
          minChunks: 1,
          priority: 2,
          name: 'dll',
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd|@ant-design|rc-picker|rc-color-picker|rc-table)/,
          minChunks: 1,
          priority: 2,
          name: 'antd',
        },
        render: {
          test: /[\\/]node_modules[\\/](form-render|table-render)/,
          minChunks: 1,
          priority: 2,
          name: 'render',
        },
        wangeditor: {
          test: /[\\/]node_modules[\\/](wangeditor)/,
          minChunks: 1,
          priority: 2,
          name: 'wangeditor',
        },
        lib: {
          test: /[\\/]node_modules[\\/](axios|cos-js-sdk-v5|lodash|core-js)/,
          minChunks: 1,
          priority: 2,
          name: 'lib',
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: 1,
          name: 'vendors',
        },
      },
    },
  },
});

if (process.env.npm_lifecycle_event === 'build:watch') {
  config = merge(config, {
    devtool: 'cheap-source-map',
  });
}
if (process.env.npm_lifecycle_event === 'build:report') {
  const BundleAnalyzerPlugin = WebpackBundleAnalyzer.BundleAnalyzerPlugin;
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
