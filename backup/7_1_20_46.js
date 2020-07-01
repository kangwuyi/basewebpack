const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const WebpackMd5Hash = require('webpack-md5-hash');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
var wgentry = require('webpack-glob-entry'); // 模糊匹配
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const ManifestPlugin = require('webpack-manifest-plugin');
/*const middleware = require('webpack-dev-middleware');
const instance = middleware(compiler);*/
const doDev = process.env.NODE_ENV !== 'production';
const doMode = doDev ? 'development' : 'production';
/*if (module.hot) {
    module.hot.accept()
}*/

/**
 * getHtmlConfig
 * @description HtmlWebpackPlugin 配置参数
 * @param filename 打包后的名字
 * @param template 引入的路径
 * @param title
 * @param chunks 分离
 * @param cdnConfig
 * @param hash 引用js加哈希戳
 */
const getHtmlConfig = function (filename, template, title, chunks, cdnConfig, hash) {
    return {
        filename: filename,
        template: template || 'view/index.html',
        title: title || '出境医',
        hash: hash || true,
        chunks: chunks || ['main'],
        //inject: '',//如果设置自动插入资源则不会报错
        minify: {
            caseSensitive: true, //是否对大小写敏感，默认false
            collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled='disabled' 简写为disabled  默认false
            collapseWhitespace: true, //是否去除空格，默认false
            minifyCSS: true, //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
            minifyJS: true, //是否压缩html里的js（使用uglify-js进行的压缩）
            preventAttributesEscaping: true, //Prevents the escaping of the values of attributes
            removeAttributeQuotes: true, //是否移除属性的引号 默认false
            removeComments: true,  //是否移除注释 默认false
            removeCommentsFromCDATA: true, //从脚本和样式删除的注释 默认false
            removeEmptyAttributes: true, //是否删除空属性，默认false
            removeOptionalTags: false, //若开启此项，生成的html中没有 body 和 head，html也未闭合
            removeRedundantAttributes: true, //删除多余的属性
            removeScriptTypeAttributes: true, //删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
            removeStyleLinkTypeAttributes: true, //删除style的类型属性， type='text/css' 同上
            useShortDoctype: true, //使用短的文档类型，默认false
            //attrs: ['img:src']
        },
        cdnConfig: cdnConfig, // cdn配置
        //onlyCss: true, //dev下只加载css
        /*chunksSortMode: function (chunk1, chunk2) {
            var order = ['common', 'public', 'index'];
            var order1 = order.indexOf(chunk1.names[0]);
            var order2 = order.indexOf(chunk2.names[0]);
            return order1 - order2;
        }*/
    };
}

/**
 * CDN 配置文件
 * @type {({scope: string, name: string, js: string}|{scope: string, name: string, js: string}|{css: string, scope: string, name: string, js: string})[]}
 */
const externalConfig = [
    {
        name: 'vue',
        scope: 'Vue',
        js: 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js'
    },
    /*{
        name: 'vue-router',
        scope: 'VueRouter',
        js: 'https://cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js'
    },*/
    {
        name: 'axios',
        scope: 'axios',
        js: 'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js'
    },
    {
        name: 'element-ui',
        scope: 'ELEMENT',
        js: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
        // css: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css'
    },
];
/**
 * clientConfig
 * @description 配置文件
 * @param entry 入口文件
 * @param output 出口文件
 * @param module 模块
 * @param plugins 插件
 * @param optimization 代码分割
 */
var clientConfig = {
    target: 'web',
    mode: doMode, // production // development
    devtool: doDev ? 'source-map' : false,
    entry: {
        index: './public/js/index.js',
        info: './public/js/info.js',
        list: './public/js/list.js',
        main: ['./public/js/index.js', './public/js/info.js', './public/js/list.js'],
        get: './public/js/get/body_parts_all.js',
        main_style: Object.values(wgentry('./public/scss/*.scss')),
    },
    output: {
        publicPath: './',
        path: path.resolve(__dirname, 'dist/'),
        filename: doDev ? 'js/[name].js' : 'js/[name].[hash:8].min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    /**
                     * babel-loader
                     * @description
                     */
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        browsers: ['> 1%', 'last 2 version']
                                        // "edge": "17",
                                        // "firefox": "60",
                                        // "chrome": "67",
                                        // "safari": "11.1",
                                    },
                                    "corejs": "2",
                                    useBuiltIns: 'usage'
                                }]

                            ]
                        }
                    }
                ],
                exclude: /((sc|sa|le|c)ss\/.*)|(node_modules\/.*)/
            },
            {
                test: /\.(sa|sc|c|le)ss$/,
                use: [
                    /**
                     * style-loader
                     * @description
                     */
                    {
                        loader: 'style-loader'
                    },
                    /**
                     * MiniCssExtractPlugin.loader
                     * @description css 分离
                     * @param options.publicPath {string} 公共路径，默认情况下，使用的是webpackOptions.output中publicPath
                     * @param options.hmr {boolean} 开发环境配置热更新
                     * @param options.minimize {boolean}
                     */
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './',
                            hmr: doDev,
                            minimize: !doDev,
                            sourceMap: doDev,
                            //esModule: doDev,
                        }
                    },
                    /**
                     * css-loader
                     * @description 解析 css
                     * @param options.importLoaders {number} 在 css-loader 前应用的 loader 的数
                     * @param options.modules {boolean} 启用/禁用 css-modules 模式
                     * @param options.sourceMap {boolean} 启用/禁用 Sourcemaps
                     * @param options.url {boolean} 启用/禁用 url() 处理
                     */
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: false,
                            sourceMap: doDev,
                        }
                    },
                    {
                        /**
                         * postcss-loader
                         * @description css 添加前缀
                         * @param options.plugins {array}
                         * @function autoprefixer 与 MiniCssExtractPlugin.loader 搭配使用
                         * @param autoprefixer overrideBrowserslist {array} 浏览器的使用范围
                         * @function postcss-pxtorem 将 px 转化为 rem，最好搭配 amfe-flexible
                         * @param autoprefixer rootValue {float} 根据设计图尺寸写，设计图是1920，就写192
                         * @param autoprefixer propList {array} 需要被转换的属性
                         * @param autoprefixer selectorBlackList {array} 不进行px转换的选择器
                         */
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer")({
                                    overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']
                                }),
                                /*require('postcss-pxtorem')({
                                    rootValue: 37.5,
                                    propList: ['*'],
                                    selectorBlackList: []
                                }),*/
                            ]
                        }
                    },
                    {
                        /**
                         * sass-loader
                         * @description 解析 scss
                         */
                        loader: 'sass-loader',
                        options: {
                            sourceMap: doDev,
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },

                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)/,
                use: [
                    {
                        /**
                         * url-loader
                         * @description 图片资源配置路径加载器，用于文件抽离
                         * @param options.name {string} 设置抽离打包图片的名称--[ext]用来获取图片的后缀
                         * @param options.limit {number} 限制图片大小 <= 100kb 进行base64编码（小于100kb打包进js文件）--测试时根据图片的大小调整
                         * @param options.outputPath {string} 设置输出文件夹名称，这个文件夹会与主入口文件在同一路径下
                         * @param options.publicPath {string} 浏览器中图片的路径
                         */
                        loader: 'url-loader',
                        options: {
                            name: '[name][hash:5].[ext]',
                            limit: 1000,
                            outputPath: 'imgs',
                            publicPath: '../imgs',
                        }
                    },
                    {
                        /**
                         * img-loader
                         * @description 配置图片资源加载器，用于图片压缩
                         * @param options.plugins {array}
                         * @function imagemin-pngquant 图片压缩，还有一个隐式调用的加载器 imagemin-loader
                         * @param imagemin-pngquant quality {array} 图片压缩30%~50%
                         */
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-pngquant')({
                                    quality: [0.3, 0.5]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    /**
                     * html-loader
                     * @description
                     * @param options.attrs 匹配 html 文件中 img 标签的 src 属性值
                     */
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src']
                        }
                    }
                ]

            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-compiled-loader',
                        options: {
                            htmlmin: true,
                            htmlminOptions: {
                                removeComments: true
                            }
                        }
                    },
                    /*{
                        loader: 'underscore-template-loader',
                        query: {
                            interpolate: '\\{\\{\\{\\[(.+?)\\]\\}\\}\\}',
                            evaluate: '\\{%([\\s\\S]+?)%\\}\\}\\}',
                            escape: '\\{\\{\\{\\{(.+?)\\}\\}\\}\\}'
                        }
                    },*/
                    /*{
                        loader: 'ejs-html-loader',
                        options: {
                            title: 'The Ant: An Introduction',
                            season: 1,
                            episode: 9,
                            production: process.env.ENV === 'production'
                        },
                    },*/
                    /*{
                        use: [{
                            loader: 'ejs-loader?variable="data"',
                            options: {
                                variable: 'data',
                                interpolate: '\\{\\{\\{(.+?)\\}\\}\\}',
                                evaluate: '\\[\\[\\[(.+?)\\]\\]\\]'
                            }
                        }]
                    },*/
                ]

            },
        ]
    },
    plugins: [
        /**
         * CleanWebpackPlugin
         * @description 清理生成文件夹
         * @param dry {boolean} 模拟删除，用来测试，false 则真的删除
         * @param verbose {boolean}
         * @param cleanOnceBeforeBuildPatterns {array} 排除文件
         */
        new CleanWebpackPlugin({
            dry: doDev,
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!noimgs', '!noimgs/**/*']
        }),
        /**
         * FixStyleOnlyEntriesPlugin
         * @description 以 css 为入口文件时，会输出多余的 js 文件，删之
         */
        new FixStyleOnlyEntriesPlugin({
            //extensions: ['css.js'],
            ignore: 'webpack-hot-middleware'
        }),
        /**
         * MiniCssExtractPlugin
         * @description 分离 css 文件
         * @param filename {string}
         * @param chunkFilename {string}
         */
        new MiniCssExtractPlugin({
            filename: doDev ? 'css/[name].css' : 'css/[name].[hash].min.css',
            chunkFilename: doDev ? '[id].css' : '[name].[hash].min.css',
        }),
        /**
         * webpack-manifest-plugin
         * @description 生成 manifest.json 插入文档
         */
        new ManifestPlugin(),
        /**
         * PurgecssPlugin
         * @description 移除无用的 css，建校 css 大小
         */
        new PurgecssPlugin({
            paths: glob.sync(`${path.join(__dirname, 'dist')}/**/*`, {nodir: true}),
        }),
        /**
         * HtmlWebpackPlugin
         * @description 打包 html 文档
         * @param 1 {string} 打包生成的文件
         * @param 2 {string} 原始文件和路径
         * @param 3 {string} html 文档的标题
         * @param 4 {array} 插入文件
         * @param 5 {array} 插入 cdn
         */
        new HtmlWebpackPlugin(getHtmlConfig('index.html', 'view/index.ejs', '首页', ['main', 'get', 'main_style'], externalConfig)),
        new HtmlWebpackPlugin(getHtmlConfig('list.html', 'view/list.ejs', '首页', ['main'], externalConfig)),
        new HtmlWebpackPlugin(getHtmlConfig('info.html', 'view/info.ejs', '首页', ['main'], externalConfig)),
        /**
         * DllReferencePlugin
         * @description 加载 dll 组件
         * @param context manifest文件中请求的上下文
         * @param manifest 编译时的一个用于加载的JSON的manifest的绝对路径
         * @param name dll暴露的地方的名称(默认值为manifest.name)
         * @param scope dll中内容的前缀
         */
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/dll/element_ui-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/dll/public_style-manifest.json')
        }),
        /**
         * AddAssetHtmlPlugin
         * @description dll 组件插入 html 文档
         * @param publicPath 浏览器路径
         */
        new AddAssetHtmlPlugin([
            {
                filepath: path.resolve(__dirname, './public/dll/*.dll.css'),
                outputPath: 'dll',
                publicPath: path.posix.join('./', 'dll'),
                includeSourcemap: doDev,
                hash: true,
                typeOfAsset: 'css',
                /*attributes: {
                    nomodule: true,
                },*/
            },
            {
                filepath: path.resolve(__dirname, './public/dll/*.dll.js'),
                outputPath: 'dll',
                publicPath: path.posix.join('./', 'dll'),
                includeSourcemap: doDev,
                hash: true,
                typeOfAsset: 'js',
                /*attributes: {
                    nomodule: true,
                },*/
            }
        ]),
        /**
         * HtmlCriticalWebpackPlugin
         * @description css 插入文档，减少调用 .css 文件
         * @param penthouse.blockJSRequests {boolean} 调用打包后的JS文件
         */
        doDev ? function () {
        } : new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'dist'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 375,
            height: 565,
            penthouse: {
                blockJSRequests: false
            }
        }),
        /**
         * ProvidePlugin
         * @description
         */
        new webpack.ProvidePlugin({
            _: "underscore"
        }),
        /**
         * NamedModulesPlugin
         * @description 用于启动 HMR 时可以显示模块的相对路径，启动模块热替换的插件
         */
        new webpack.HotModuleReplacementPlugin(),
    ],
    /**
     * devServer
     * @description 配置 webpack 开发服务功能
     * @param progress {boolean} 如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用
     * @param contentBase {string} 服务器目录
     * @param compress {boolean} gzip 压缩
     * @param historyApiFallback {boolean} 让所有 404 的页面定位到 index.html
     * @param hot {boolean} 热更新，修改代码后，不刷新整个页面
     */
    devServer: {
        progress: true,
        contentBase: path.join(__dirname, "/dist"),
        // contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8000,
        writeToDisk: true,
        //host: '0.0.0.0',
        //hotOnly: true,
        historyApiFallback: true,
        hot: true
    },
    optimization: {
        minimizer: [
            /**
             * UglifyJsPlugin
             * @description Javascript 压缩优化
             * @param uglifyOptions.compress.drop_console {boolean} 注释 console
             * @param uglifyOptions.compress.drop_debugger {boolean} 注释debugger
             * @param uglifyOptions.compress.pure_funcs {array} 移除 console
             * @param uglifyOptions.output.beautify {boolean} 压缩注释
             * @param uglifyOptions.except {array} 排除关键字
             * @param test {string} 匹配文件
             * @param include {array|string} 包含文件
             * @param exclude {array|string} 排除文件
             * @param chunkFilter {function} 过滤
             * @param cache {boolean} 缓冲
             * @param sourceMap {boolean} 源码调试
             * @param parallel {boolean} 多进程并行运行
             * @param extractComments {boolean} 禁止构建注释
             */
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log']
                    },
                    // warnings: false,
                    mangle: false,
                    output: {
                        beautify: true
                    },
                    except: ['$super', '$', 'exports', 'require']
                },
                test: /\.js(\?.*)?$/i,
                include: ['./public/js/index.js', './public/js/info.js', './public/js/list.js'],
                exclude: ['/node_module/', '/public/imgs/', '/public/scss/', '/public/css/'],
                chunkFilter: (chunk) => {
                    /**
                     * `vendor` 模块不压缩
                     */
                    return chunk.name !== 'vendor';

                },
                cache: true,
                sourceMap: doDev,
                parallel: true,
                extractComments: false,
            }),
            /**
             * OptimizeCSSAssetsPlugin
             * @description 对 css 文件进行压缩和优化
             * @param assetNameRegExp {string} 正则表达式，指示应优化\最小化的资产的名称。
             * @param cssProcessor {object} 优化\最小化CSS的CSS处理器
             * @param canPrint {boolean}  指示插件是否可以将消息打印到控制台
             * @param cssProcessorOptions 如果是生产环境，一定要设值为 false，以取消掉 map 之类
             * @param cssProcessorOptions.safe {boolean}  避免 cssnano 重新计算 z-index
             * @param cssProcessorOptions.autoprefixer {boolean} cssnano 自身集成 autoprefixer 功能，清理无关前缀的需要关闭 autoprefixer，转用 postcss 的 autoprefixer
             * @param cssProcessorOptions.map.inline {boolean} 不生成内联映射,这样配置就会生成一个source-map文件
             * @param cssProcessorOptions.map.annotation {boolean} css文件添加source-map路径注释
             */
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)/g,
                cssProcessor: require('cssnano'),
                canPrint: true,
                cssProcessorOptions: !doDev ? false : {
                    safe: true,
                    autoprefixer: false,
                    discardComments: {removeAll: true},
                    map: {
                        inline: false,
                        annotation: true
                    }
                },
            })
        ],
        /**
         * splitChunks
         * @description 公共部分的提取
         * @param chunks {string} initial 异步代码分割，all 同步代码分割
         * @param minSize {number} 大于该值做代码分割
         */
        splitChunks: {
            chunks: "all",
            minSize: 3000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                commons: {
                    name: 'commons',    //提取出来的文件命名
                    chunks: 'initial',
                    minChunks: 2,       //表示提取公共部分最少的文件数
                    minSize: 0,         //表示提取公共部分最小的大小
                    priority: 0
                },
                /**
                 * @description 打包 node_modules 中的文件
                 */
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: -20
                },
                styles: {
                    name: 'css/styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    /*watch:true,
    watchOptions:{
        ignored: /node_modules/
    },*/
};
module.exports = [clientConfig];