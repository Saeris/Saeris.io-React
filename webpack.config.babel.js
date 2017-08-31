import { join, resolve } from 'path' //eslint-disable-line
//import util from 'util'
import { DefinePlugin, ProvidePlugin, LoaderOptionsPlugin, HotModuleReplacementPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin, optimize } from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin' // https://github.com/lodash/lodash-webpack-plugin
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import DashboardPlugin from 'webpack-dashboard/plugin'

const { ModuleConcatenationPlugin, CommonsChunkPlugin, UglifyJsPlugin } = optimize

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || (process.env.NODE_ENV = `development`)
const envDev = ENV === `development`
const envProd = ENV === `production`
const envTest = ENV === `test`
const title = `Ignition`
const name = `Ignition`
const description = ``
const baseURL = `/`
const bgColor = `#fff`
const themeColor = `#2c1e3f`
const host = process.env.HOST || `localhost`
const port = process.env.PORT || 9000
const srcDir = join(__dirname, `src`)
const pubDir = join(__dirname, `public`)
const outDir = join(__dirname, `dist`)
const npmDir = join(__dirname, `node_modules`)

const isVendor = ({ resource }) => resource && resource.indexOf(npmDir) !== -1

const appCSS = new ExtractTextPlugin({
  filename: `[name]_[chunkhash].css`,
  allChunks: true
})

const vendorCSS = new ExtractTextPlugin({
  filename: `vendor_[chunkhash].css`,
  allChunks: true
})

const config = {
  entry: {
    vendor: [
      `font-awesome/scss/font-awesome.scss`,
      `bootstrap/scss/bootstrap-reboot.scss`,
      `history`,
      `prop-types`,
      `preact`,
      `preact-compat`,
      `react-apollo`,
      `react-redux`,
      `react-router`,
      `react-router-dom`,
      `react-router-redux`,
      `redux`,
      `redux-logger`
    ],
    polyfills: [
      `babel-polyfill`,
      `whatwg-fetch`
    ],
    app: [
      ...(envDev
        ? [
          `react-hot-loader/patch`,
          `webpack-dev-server/client?http://${host}:${port + 100}/`,
          `webpack/hot/only-dev-server`,
          `preact/devtools`
        ]
        : []),
      `./src/app.js`
    ]
  },
  output: {
    path: outDir,
    publicPath: `/`,
    filename: envProd ? `[name].[chunkhash].bundle.js` : `[name].bundle.js`,
    sourceMapFilename: envProd ? `[name].[chunkhash].bundle.map` : `[name].bundle.map`,
    chunkFilename: envProd ? `[id].[chunkhash].chunk.js` : `[id].chunk.js`
  },
  stats: {
    colors: true,
    reasons: false,
    chunks: false
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: [`.js`, `.jsx`, `.json`, `.scss`, `.sass`, `.css`],
    alias: {
      // Application Aliases
      '@': srcDir,
      '@components': join(srcDir, `app/components`),
      '@models': join(srcDir, `app/models`),
      '@public': pubDir,
      '@routes': join(srcDir, `app/routes`),
      '@services': join(srcDir, `app/services`),
      // Module Aliases
      react: `preact-compat/dist/preact-compat`,
      'react-dom': `preact-compat/dist/preact-compat`,
      'create-react-class': `preact-compat/lib/create-react-class`,
      'react-addons-css-transition-group': `preact-css-transition-group`
    },
    modules: [
      srcDir,
      npmDir
    ]
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: npmDir, loader: `babel-loader`, options: { forceEnv: ENV } },
      { test: /\.(css|s[ac]ss)$/, include: srcDir, use: appCSS.extract({
        fallback: `style-loader`, use: [
          { loader: `css-loader`, options: {
            modules: true,
            sourceMap: envDev,
            localIdentName: `[name]_[hash:base64:5]`,
            importLoaders: 3
          } },
          { loader: `postcss-loader`, options: { sourceMap: envDev } },
          { loader: `resolve-url-loader`, options: {sourceMap: envDev } },
          { loader: `sass-loader`, options: { sourceMap: true, precision: 8 } }
        ]
      })},
      { test: /\.(css|s[ac]ss)$/, exclude: srcDir,  use: vendorCSS.extract({
        fallback: `style-loader`, use: [
          { loader: `css-loader`, options: {
            modules: false,
            sourceMap: envDev,
            importLoaders: 3
          } },
          { loader: `postcss-loader`, options: { sourceMap: envDev } },
          { loader: `resolve-url-loader`, options: {sourceMap: envDev } },
          { loader: `sass-loader`, options: { sourceMap: true, precision: 8 } }
        ]
      })},
      //{ test: require.resolve(`jquery`), loader: `expose-loader?$!expose-loader?jQuery` },
      { test: /\.json$/, loader: `json-loader` },
      { test: /\.(graphql|gql)$/, exclude: npmDir, loader: `graphql-tag/loader` },
      { test: /\.(mp4|mov|ogg|webm)(\?.*)?$/i, loader: `url-loader` },
      { test: /\.(png|gif|jpg|cur)$/, loader: `url-loader`, query: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `url-loader`, query: { limit: 10000, mimetype: `application/font-woff2` } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `url-loader`, query: { limit: 10000, mimetype: `application/font-woff` } },
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `file-loader` },
      { test: /\src\/images$/, loader: `ignore-loader` }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: port + 100,
    host: host,
    compress: true,
    inline: true,
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: {
      colors: true,
      chunks: false
    }
  },
  devtool: envTest ? `inline-source-map` : `hidden-source-map`,
  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/index.ejs`,
      title,
      baseURL,
      serviceWorker: envProd ? `/service-worker.js` : null,
      inject: false,
      chunksSortMode: `dependency`,
      minify: envProd ? { removeComments: true, collapseWhitespace: true } : undefined
    }),
    new WebpackPwaManifest({
      name: title,
      short_name: name,
      description: description,
      background_color: bgColor,
      theme_color: themeColor,
      display: `standalone`,
      orientation: `portrait-primary`
      /*,
      icons: [{
        src: resolve(`${pubDir}/images/icons/ios-icon.png`),
        sizes: [120, 152, 167, 180, 1024],
        destination: join(`icons`, `ios`)
      }, {
        src: resolve(`${pubDir}/images/icons/android-icon.png`),
        sizes: [36, 48, 72, 96, 144, 192, 512],
        destination: join(`icons`, `android`)
      }]*/
    }),
    ...(envProd
      ? [
        new SWPrecacheWebpackPlugin({
      		navigateFallback: `index.html`,
          filepath: `${outDir}/service-worker.js`,
      		minify: true,
      		staticFileGlobsIgnorePatterns: [
      			/polyfills(\..*)?\.js$/,
      			/\.map$/,
      			/asset-manifest\.json$/
      		]
      	}),
        new LoaderOptionsPlugin({
          options: { htmlLoader: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true
          } }
        })
      ]
      : []),
    new CopyWebpackPlugin([
      { from: `_redirects` },
      //{ from: `favicon.ico`, to: `favicon.ico` },
      { context: `src/img`, from: `**/*`, to: `img` }
    ]),
    new DefinePlugin({
      '__DEV__': !envProd,
      'ENV': JSON.stringify(ENV),
      'HMR': true,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': true,
        ...(!envProd ? { 'WEBPACK_HOST': JSON.stringify(host), 'WEBPACK_PORT': JSON.stringify(port) } : {})
      }
    }),
    new ProvidePlugin({
      React : `react`,
      h: [`preact`, `h`],
      classnames: `classnames`,
      Component: [`react`, `Component`],
      connect: [`react-redux`, `connect`],
      linkState: `linkstate`,
      debounce: [`decko`, `debounce`],
      memoize: [`decko`, `memoize`],
      PropTypes: `prop-types`,
      //$: `jquery`,
      //jQuery: `jquery`,
      //'window.jQuery': `jquery`,
      regeneratorRuntime: `regenerator-runtime`,
      Promise: `core-js/fn/promise`
    }),
    new LodashModuleReplacementPlugin(),
    appCSS,
    vendorCSS,
    new ModuleConcatenationPlugin(),
    new CommonsChunkPlugin({
      name: `polyfills`,
      chunks: [`polyfills`],
      minChunks: isVendor
    }),
    new CommonsChunkPlugin({
      name: `vendor`,
      chunks: [`app`, `vendor`],
      minChunks: isVendor
    }),
    ...(envDev
      ? [
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
        new NoEmitOnErrorsPlugin(),
        new BrowserSyncPlugin({ host: host, port: port, proxy: `http://${host}:${port + 100}/` }, { reload: false })
      ]
      : []),
    new UglifyJsPlugin({
      beautify: envDev,
      comments: envDev,
      sourceMap: envDev,
      mangle: envProd,
      compress: {
        keep_fnames: envDev,
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
        sequences: envProd,
        properties: envProd,
        drop_debugger: envProd,
        conditionals: envProd,
        comparisons: envProd,
        evaluate: envProd,
        booleans: envProd,
        loops: envProd,
        hoist_funs: envProd,
        if_return: envProd,
        join_vars: envProd,
        cascade: envProd,
        side_effects: envProd,
        collapse_vars: envProd,
        reduce_vars: envProd
      }
    }),
    ...(envDev
      ? [
        new BundleAnalyzerPlugin({
          analyzerMode: `server`,
          analyzerPort: 8888,
          defaultSizes: `parsed`,
          openAnalyzer: false
        }),
        new DashboardPlugin()
      ]
      : [])
  ].filter(nonNull => nonNull)
}

//console.log(util.inspect(config, {showHidden: false, depth: null}))

export default config
