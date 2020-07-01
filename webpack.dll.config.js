const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const doDev = process.env.NODE_ENV !== 'production';
const doMode = doDev ? 'development' : 'production';

const dllPath = path.join(__dirname, 'public/dll');

module.exports = {
    target: 'web',
    mode: doMode,
    entry: {
        element_ui: ['./public/css/element.css'],
        public_style: ['./public/css/reset.css','./public/css/common.css']
    },
    output: {
        path: dllPath,
        filename: '[name].dll.js',
        library: '[name]_[hash]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {  // 指定参数
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 version']
                                }
                            }]

                        ]
                    }
                },
                exclude: ['/node_module/', '/public/css/']
            },
            {
                test: /\.(sa|sc|c|le)ss$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 公共路径
                            // 默认情况下，使用的是webpackOptions.output中publicPath
                            publicPath: './',
                            //开发环境配置热更新
                            hmr: doDev,
                            minimize: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: false,
                            //localIdentName: '[local]_[hash:base64:8]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: 'imgs/[name].[ext]'
                }
            },
        ]
    },
    plugins: [
        // 清理生成文件夹
        new CleanWebpackPlugin({
            dry: false, // 模拟删除，用来测试，false 则真的删除
            verbose: true
            //cleanOnceBeforeBuildPatterns: ['**/*', '!analogdataImgs', '!analogdataImgs/**/*']
        }),
        /**
         * DllPlugin
         * @description
         * @param name {string} 要与 output.library 保持一致
         */
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(__dirname, 'public/dll', '[name]-manifest.json')
        }),
        // 分离css
        new MiniCssExtractPlugin({
            // 分离文件路径
            filename: doDev ? '[name].dll.css' : '[name].[hash].dll.min.css',
            chunkFilename: doDev ? '[id].dll.css' : '[name].[hash].dll.min.css'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        /**
         * FixStyleOnlyEntriesPlugin
         * @description 以 css 为入口文件时，会输出多余的 js 文件，删之
         */
        //new FixStyleOnlyEntriesPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                /* elementScript: {
                     name: 'elementjs',
                     chunks: 'async',
                     priority: 10,
                     reuseExistingChunk: true,
                     enforce: true
                 },*/
                /*elementStyles: {
                    name: 'element_ui',
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                },
                commonStyles: {
                    name: 'public_style',
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: false
                }*/
            }
        }/*,
        runtimeChunk: {
            "name": "manifest"
        },*/
    }
}