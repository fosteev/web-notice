const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: "usage",
                                    "corejs": "2",
                                    targets: {
                                        browsers: "> 1%, not ie 11, not op_mini all"
                                    }
                                }
                            ],
                            "@babel/preset-react"
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime',
                            [
                                "import",
                                {
                                    "libraryName": "@material-ui/core",
                                    "libraryDirection": "",
                                    "camel2DashComponentName": false
                                },
                                "@material-ui/core"
                            ],
                            [
                                "import",
                                {
                                    "libraryName": "@material-ui/icons",
                                    "libraryDirection": "",
                                    "camel2DashComponentName": false
                                },
                                "@material-ui/icons"
                            ]
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            '@material-ui/core': "@material-ui/core/es"
        }
    },
    output: {
        filename: './bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new CleanWebpackPlugin(['dist/*.*']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Production'
        })
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        port: 4000
    }
};
