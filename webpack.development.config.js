const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BASE_PATH = path.join(__dirname);


module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    // entry: [
    //     'react-hot-loader/patch',
    //     path.join(BASE_PATH, 'src/index.tsx'),
    //     path.join(BASE_PATH, 'src/assets/scss/index.scss'),
    // ],
    entry: {
        patch: 'react-hot-loader/patch',
        main: path.join(BASE_PATH, 'src/index.tsx'),
        styles: path.join(BASE_PATH, 'src/assets/scss/index.scss'),
        'firebase-messaging-sw': path.join(BASE_PATH, 'src/service-worker/worker.ts'),
    },
    output: {
        path: path.resolve(BASE_PATH, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            '@': path.join(BASE_PATH, './src'),
            '~': path.join(BASE_PATH, './node_modules'),
        },
    },
    devServer: {
        host: '0.0.0.0',
        port: 9998,
        contentBase: path.join(BASE_PATH, 'static'),
        compress: true,
        open: true,
        progress: true,
        hot: true,
        publicPath: '/',
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                changeOrigin: false,
                secure: false,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.ts?x?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    { loader: 'css-hot-loader' },
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentWidth: 4,
                                includePaths: [ path.resolve(BASE_PATH, 'src') ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: path.resolve(BASE_PATH, 'static/index.html'),
            title: 'Development',
        }),
        new TSLintPlugin({
            files: ['./src/**/*.ts']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
}