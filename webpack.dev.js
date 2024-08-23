import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import WorkboxPlugin from 'workbox-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/client/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/', 
        libraryTarget: 'var',
        library: 'Client'
    },
    devtool: 'inline-source-map', 
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 
                    'css-loader',   
                    'sass-loader'   
                ]
                
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(), 
        new WorkboxPlugin.GenerateSW({
            swDest: 'service-worker.js',
            clientsClaim: true,
            skipWaiting: true,
        })
    ],
    devServer: {
        port: 8080,
        allowedHosts: 'all',
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8000', // Proxy API requests to the backend server running on port 8000
                secure: false,
                changeOrigin: true,
            }
        }
    }
};
