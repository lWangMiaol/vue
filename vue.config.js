module.exports = {
  publicPath: '/mz',//打包配置项
  devServer: {
      overlay: {
        warnings: false,
        errors: false
      },
      proxy:{
        '/info':{
          target:"http://47.96.0.211:3000",
          changeOrigin:true,
          pathRewrite:{
            "^/info":""
          }
        }
      }
  },
  lintOnSave:false //直接关闭eslint检查
}