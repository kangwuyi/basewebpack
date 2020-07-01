const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

const devMode = process.env.NODE_ENV !== 'production' ? 'development' : 'production';

const dllPath = path.join(__dirname, 'public/dll');

module.exports = {
    target: 'web',
    mode: devMode, // production // development
    entry: {
        //elementjs:['./public/js/element.js'],
        elementcss: ['./public/css/element.css'],
        commoncss: ['./public/css/common.css']
    },
    output: {
        path: dllPath,
        filename: '[name].js',
        library: '_dll_[name]'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 值一个正则，符合这些正则的资源会用一个loade来处理
                use: {
                    loader: 'babel-loader', // 使用bable-loader来处理
                    options: {  // 指定参数
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 version'] //具体可以去babel-preset里面查看
                                }
                            }]

                        ] // 指定哪些语法编译
                    }
                },
                exclude: ['/node_module/', '/public/css/'] // 排除在外
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
                            hmr: process.env.NODE_ENV === 'development',
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
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'public/dll', 'manifest.json')
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        // 分离css
        new MiniCssExtractPlugin({
            // 分离文件路径
            filename: devMode !== 'production'  ? '[name].css' : '[name].[hash].min.css',
            chunkFilename: devMode !== 'production' ? '[id].css' : '[name].[hash].min.css'
        })
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
                elementStyles: {
                    name: 'elementcss',
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                },
                commonStyles: {
                    name: 'commoncss',
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: false
                }
            }
        }/*,
        runtimeChunk: {
            "name": "manifest"
        },*/
    }
}