const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  // 关闭线上源码
  productionSourceMap: false,
  // css相关配置
  // 图片在10kb以内使用内联base64图片
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10240 }))
  },
  // 部署应用包时的基本 URL(解决build打包后资源文件404问题) :https://cli.vuejs.org/zh/config/#baseurl
  publicPath: "./",
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    },
    // 勿略console.log语句
    plugins: process.env.NODE_ENV === 'production'
      ? [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ]
      : [],
  }
}