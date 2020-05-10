const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const WebpackBar = require('webpackbar');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new ErrorOverlayPlugin(),
        new WebpackBar()
    ],
    devServer: {
        contentBase: './dist'
    }
})