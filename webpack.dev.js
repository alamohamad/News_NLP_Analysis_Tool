const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
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
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: false,
        port: 8080,
        liveReload: true,
    },
});
