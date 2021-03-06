'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
var chokidar = require('chokidar');
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const pluginsDomain = require('../config/plugins.env');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const templateComponent = chokidar.watch(path.join(__dirname,'../src/components'));
const templateFile = chokidar.watch(path.join(__dirname,'../src/pages'));
const autoRoute =require('../build/automaticRoute/generateRoute');
const autoComponents =require('../build/automaticComponent/generateComponent');
autoRoute();
autoComponents();
// component
templateComponent.on('ready', () => {
  templateComponent.on('add', (path) => {
    autoComponents();
  });
  templateComponent.on('unlink', (path) => {
    autoComponents();
  });
  templateComponent.on('addDir', (path) => {
    autoComponents();
  });
  templateComponent.on('unlinkDir', (path) => {
    autoComponents();
  });
})
// router
templateFile.on('ready', () => {
  templateFile.on('add', (path) => {
    autoRoute();
  });
  templateFile.on('unlink', (path) => {
    autoRoute();
  });
  templateFile.on('addDir', (path) => {
    autoRoute();
  });
  templateFile.on('unlinkDir', (path) => {
    autoRoute();
  });
})

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    disableHostCheck:true,//授权的 host
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    //热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      files: {
        js:pluginsDomain.jsFiles,
        css:pluginsDomain.cssFiles,
      },
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      },{
        from: path.resolve(__dirname, '../src/assets'),
        to: 'assets',
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
