'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

let cdn = { css: [], js: [] }
// 通过环境变量 来区分是否使用cdn
const isProd = process.env.NODE_ENV === 'production' // 判断是否是生产环境
let externals = {}
if (isProd) {
    // 如果是生产环境 就排除打包 否则不排除
    externals = {
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        'xlsx': 'XLSX',
        'vue-quill-editor': 'VueQuillEditor',
    }
    cdn = {
        css: [
            // element-ui css
            'https://unpkg.com/element-ui/lib/theme-chalk/index.css', // 样式表
            // 富文本编辑器
            'https://cdn.staticfile.org/quill/1.3.6/quill.snow.css',
            'https://cdn.staticfile.org/quill/1.3.6/quill.bubble.css',
            'https://cdn.staticfile.org/quill/1.3.6/quill.core.css',

        ],
        js: [
            // vue must at first!
            'https://unpkg.com/vue/dist/vue.js', // vuejs
            // element-ui js
            'https://unpkg.com/element-ui/lib/index.js',
            // XLSX
            'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/jszip.min.js',
            'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/xlsx.full.min.js',
            // 富文本
            'https://cdn.staticfile.org/quill/1.3.6/quill.js',
            'https://cdn.staticfile.org/quill/1.3.6/quill.min.js',
            'https://cdn.staticfile.org/quill/1.3.6/quill.core.js'
        ]
    }
}
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        // 代理跨域的配置
        proxy: {
            // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
            '/api': {
                target: 'http://127.0.0.1:3000/', // 跨域请求的地址
                changeOrigin: true, // 只有这个值为true的情况下 才表示开启跨域
                pathRewrite: {
                    // 重新路由  localhost:8888/api/login  => www.baidu.com/api/login
                    '^/api': '' // 假设我们想把 localhost:8888/api/login 变成www.baidu.com/login 就需要这么做 
                }
            }
        }

    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        // 排除包名
        /**
         * key:要排除的包名
         * value：实际上是 实际引入的包的全局变量名
         * externals 首先会排除掉 key，空出来的位置 会用 value 来替代
         */
        externals: externals
    },
    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ])
        // 注入cdn文件
        // 这行代码 会在执行打包的时候 执行 就会将cdn变量注入到html模板中
        config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args
        })

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch')

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}
