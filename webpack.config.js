const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        'js/app': ['./src/index.jsx'],
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/, // .less and .css
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.css$/, // .less and .css
                use: [
                    'style-loader',
                    'css-loader',
                ],
            }
        ],
    },
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 9080,
        publicPath: '/',
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new Dotenv()
    ],
};
