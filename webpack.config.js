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
/*const middleware = require('webpack-dev-middleware');

const instance = middleware(compiler);*/
const doMode = process.env.NODE_ENV !== 'production' ? 'development' : 'production';
const doDev = process.env.NODE_ENV !== 'production';
if (module.hot) {
    module.hot.accept()
}
// 获取html-webpack-plugin参数的方法
const getHtmlConfig = function (filename, template, title, chunks, cdnConfig, hash) {
    return {
        filename: filename,//打包后的名字
        template: template || 'view/index.html',//引入的路径
        title: title || '出境医',
        hash: hash || true,//引用js加哈希戳
        chunks: chunks||['main', 'maincss'], // 分离
        //inject: '',//问题就出在这里 如果设置自动插入资源则不会报错
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
/* 开始配置 cdn */
// 国内免费cdn镜像源
const cdnBaseHttp = 'https://cdn.bootcss.com/';
// 添加cdn模块
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
        css: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css'
    },
];

var dllConfig = {};
var clientConfig = {
    target: 'web',
    mode: doMode, // production // development
    devtool: 'source-map',
    //入口文件的配置项
    entry: {
        index: './public/js/index.js',
        info: './public/js/info.js',
        list: './public/js/list.js',
        main: ['./public/js/index.js', './public/js/info.js', './public/js/list.js'],
        get: './public/js/get/body_parts_all.js',
        maincss: ['./public/scss/reset.scss', './public/scss/layout.scss', './public/scss/index.scss']
    },
    //出口文件的配置项
    output: {
        publicPath: './',
        path: path.resolve(__dirname, 'dist/'),
        filename: doDev ? 'js/[name].js' : 'js/[name].[hash:8].min.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
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
                    //{loader: 'style-loader'},
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 公共路径
                            // 默认情况下，使用的是webpackOptions.output中publicPath
                            publicPath: './',
                            //开发环境配置热更新
                            hmr: doDev,
                            minimize: !doDev
                        }
                    },

                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: false

                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer")({
                                    overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']
                                }), // 跟MiniCssExtractPlugin.loader一起使用时 要添加 使用范围
                                /*require('postcss-pxtorem')({
                                    rootValue: 37.5,
                                    propList: ['*']
                                })*/

                            ]
                        }
                    },//在css前面加前缀(先处理postcss-loader在处理css-loader)
                    {loader: 'sass-loader'},

                ]
            },

            /*{ test: /\.html$/, loader: "underscore-template-loader" },*/
            {
                test: /\.(jpe?g|png|gif|svg)/,
                use: [
                    {
                        loader: 'url-loader',//给图片资源配置路径加载器，用于文件抽离
                        options: {
                            name: '[name][hash:5].[ext]',//设置抽离打包图片的名称--[ext]用来获取图片的后缀
                            limit: 1000,//限制图片大小 <= 100kb 进行base64编码（小于100kb打包进js文件）--测试时根据图片的大小调整
                            outputPath: 'imgs',//设置输出文件夹名称，这个文件夹会与主入口文件在同一路径下
                            publicPath: '../imgs',
                        }
                    },
                    {
                        loader: 'img-loader',//配置图片资源加载器，用于图片压缩
                        options: {
                            plugins: [//给图片资源加载配置插件
                                require('imagemin-pngquant')({//用于图片压缩的imagemin-pngquant，还有一个隐式调用的加载器imagemin-loader
                                    quality: [0.3, 0.5]//图片压缩30%~50%
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src']//配置html文件中img标签的src属性值
                        }
                    }
                ]

            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-compiled-loader?'
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
    //插件，用于生产模版和各项功能
    plugins: [
        // 清理生成文件夹
        new CleanWebpackPlugin({
            dry: doDev, // 模拟删除，用来测试，false 则真的删除
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!noimgs', '!noimgs/**/*']
        }),
        // 分离css
        new MiniCssExtractPlugin({
            // 分离文件路径
            filename: doDev ? 'css/[name].css' : 'css/[name].[hash].min.css',
            chunkFilename: doDev ? '[id].css' : '[name].[hash].min.css',
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index.html', 'view/index.ejs', '首页', ['main', 'maincss','get'], externalConfig)),
        new HtmlWebpackPlugin(getHtmlConfig('list.html', 'view/list.ejs', '首页', [ 'maincss'], externalConfig)),
        new HtmlWebpackPlugin(getHtmlConfig('info.html', 'view/info.ejs', '首页', ['maincss'], externalConfig)),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/dll/manifest.json')
        }),
        new AddAssetHtmlPlugin([
            /*  {
              filepath: path.resolve(__dirname, './public/dll/elementjs.js'),
              outputPath: 'js',
              publicPath: path.posix.join('./', 'js'), //浏览器路径
              includeSourcemap: false,
              hash: true,
          },*/
            {
                filepath: path.resolve(__dirname, './public/dll/elementcss.css'),
                outputPath: 'css',
                publicPath: path.posix.join('./', 'css'), //浏览器路径
                includeSourcemap: false,
                hash: true,
                typeOfAsset: 'css'
            }, {
                filepath: path.resolve(__dirname, './public/dll/commoncss.css'),
                outputPath: 'css',
                publicPath: path.posix.join('./', 'css'), //浏览器路径
                includeSourcemap: false,
                hash: true,
                typeOfAsset: 'css'
            }]),
        // new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(),   //hot module replacement 启动模块热替换的插件
        /*new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'dist'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 375,
            height: 565,
            // 确保调用打包后的JS文件
            penthouse: {
                blockJSRequests: false
            }
        })*/
        new webpack.ProvidePlugin({
            _: "underscore"
        })
    ],
    //配置webpack开发服务功能
    devServer: {
        progress: true,//如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用。
        contentBase: path.join(__dirname, "/dist"), // 服务器目录
        compress: true, // gzip 压缩
        port: 8000,
        writeToDisk: true,
        //host: '0.0.0.0',
        //hotOnly: true,
        historyApiFallback: true,//让所有404的页面定位到index.html
        hot: true //热更新，修改代码后，不刷新整个页面
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,// 注释console
                        drop_debugger: false, // 注释debugger
                        pure_funcs: ['console.log'] //移除console
                    },
                    // warnings: false,
                    mangle: false,
                    output: {
                        beautify: true //压缩注释
                    },
                    except: ['$super', '$', 'exports', 'require'] //排除关键字
                },
                test: /\.js(\?.*)?$/i,  //测试匹配文件,
                include: ['./public/js/index.js', './public/js/info.js', './public/js/list.js'], //包含哪些文件
                exclude: ['/node_module/', '/public/imgs/'], //不包含哪些文件
                //允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
                //返回true以uglify块，否则返回false。
                chunkFilter: (chunk) => {
                    // `vendor` 模块不压缩
                    if (chunk.name === 'vendor') {
                        return false;
                    }
                    return true;
                },
                cache: true,//缓冲
                sourceMap: true,//源码调试
                parallel: true,//多进程并行运行
                extractComments: false, //禁止构建注释
            }),
            // 压缩css
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)/g, //正则表达式，指示应优化\最小化的资产的名称。
                cssProcessor: require('cssnano'), //优化\最小化CSS的CSS处理器
                canPrint: true, //指示插件是否可以将消息打印到控制台
                cssProcessorOptions: {
                    // 避免 cssnano 重新计算 z-index
                    safe: true,
                    // cssnano 集成了autoprefixer的功能
                    // 会使用到autoprefixer进行无关前缀的清理
                    // 关闭autoprefixer功能
                    // 使用postcss的autoprefixer功能
                    autoprefixer: false,
                    discardComments: {removeAll: true},
                    map: {
                        // 不生成内联映射,这样配置就会生成一个source-map文件
                        inline: false,
                        // 向css文件添加source-map路径注释
                        // 如果没有此项压缩后的css会去除source-map路径注释
                        annotation: true
                    }
                }
            })
        ],
        // 公共部分的提取
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',    //提取出来的文件命名
                    chunks: 'initial',  //initial表示提取入口文件的公共部分
                    minChunks: 2,       //表示提取公共部分最少的文件数
                    minSize: 0,         //表示提取公共部分最小的大小
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: -20
                }
            }
        }
    },
};
module.exports = [clientConfig];