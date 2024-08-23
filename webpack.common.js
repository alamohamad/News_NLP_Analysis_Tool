const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',  // Ensure there's no hash here
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',  // Ensure there's no hash here
        }),
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            inject: true,
        }),
    ],
};
