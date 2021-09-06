const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_PROJECT_TITLE || 'Lyra App'
const port = process.env.port || process.env.npm_config_port || 8989 // dev port

module.exports = {
  publicPath: process.env['VUE_APP_PUBLIC_PATH'],
  outputDir: 'source',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/assets': {
        target: 'http://127.0.0.1:4000/assets',
        changeOrigin: true,
        pathRewrite: { '^/assets': '' }
      }
    }
  },
  configureWebpack: {
    name: name
  },
  chainWebpack(config) {
    // Disable preload and prefetch
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.module.rule('svg').exclude.add(resolve('src/assets')).end()

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
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

    config.when(process.env.NODE_ENV === 'development', config => {
      config.devtool('cheap-source-map')
    })

    config.when(process.env.NODE_ENV !== 'development', config => {
      config.plugin('html').tap(args => {
        args[0].filename = path.resolve(__dirname, './layout/index.ejs')
        args[0].template = path.resolve(__dirname, './public/index_prod.html')
        args[0].inject = 'body'
        return args
      })
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
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

      config.optimization.runtimeChunk('single')

      // CopyWebpackPlugin Configs
      // https://github.com/webpack-contrib/copy-webpack-plugin
      config.plugin('copy').tap(args => {
        args[0]['patterns'][0].globOptions.ignore = ['.*', '**/*.html']
        args[0]['patterns'][0].to = path.resolve(__dirname, './source')
        return args
      })
    })
  }
}
