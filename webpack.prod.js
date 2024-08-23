const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'bundle.js',  // Ensure no hash here
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',  // Ensure no hash here
        }),
    ],
    optimization: {
        minimize: true,
    },
});
