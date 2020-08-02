// module.exports = {
//   devServer: {
//     proxy: '/api'
//   },
//   assetsDir: 'static',
//   parallel: false,
//   publicPath: './'
// } // 上线配置
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' }
      },
      '': {
        target: 'http://localhost:5000/'
      }
    }
  }
} // 开发配置
