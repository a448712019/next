const withCss = require('@zeit/next-css')
const webpack = require('webpack')
const withLess = require('@zeit/next-less')
const config = require('./config')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
// const config = {
//     //编译文件的输出目录
//     distDir: 'dest',
//     //是否给每个路由生成Etage(缓存验证)
//     generateEtags: true,
//     //页面内容缓存配置
//     onDemandEntries: {
//         //内容在内存中缓存的时长
//         maxInactiveAge: 25 * 1000,
//         //同时缓存多少哥页面
//         pagesBufferLength: 2,
//     },
//     //在pages目录喜爱那种后缀的文件会被认为是页面
//     pageExtensions: ['jsx', 'js'],
//     //配置buildId
//     generateBuildId: async () => {
//         if(process.env.YOUR_BUILD_ID){
//             return process.env.YOUR_BUILD_ID
//         }
//         //返回null使用默认的unique id
//         return null
//     },
//     //手动修改webpack config
//     webpack(config, options){
//         return config
//     },
//     //修改webpackDevMiddleware配置
//     webpackDevMiddleware: config => {
//         return config
//     },
//     //可以在页面上通过 procsess.env.customKey获取value
//     env: {
//         customKey: 'value',
//     },
//     //下面两个要通过 'next/config' 来读取
//     //只有在服务端渲染时才会获取配置
//     serverRuntimeConfig: {
//         mySecret: 'secret',
//         secondSecret: process.env.SECOND_SECRET,
//     },
//     //在服务端渲染和客户端渲染都可获取的配置
//     pubilcRuntimeConfig: {
//         staticFolder: '/static'
//     }

// }

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}

module.exports = withBundleAnalyzer(withLess(withCss({
    webpack(config){
        config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
        return config
    },
    publicRuntimeConfig: {
        GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
        OAUTH_URL: config.OAUTH_URL
    },
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../bundless/server.html'
        },
        browser:{
            analyzerMode: 'static',
            reportFilename: '../bundless/client.html'
        }
    }
})))