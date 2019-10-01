const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/src/index.js',
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "collaborate"), 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            reducers: path.resolve(__dirname, './client/src/reducers')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/public/index.html'
        })
    ]
};