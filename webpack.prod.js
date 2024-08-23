import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: 'index.html',
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: 'service-worker.js',
            clientsClaim: true,
            skipWaiting: true,
        }),
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ]
};
