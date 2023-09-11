/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const vendor = require('./vendor')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const isAnalyze = Boolean(env?.analyze)

  const config = {
    entry: {
      bundle: path.resolve(__dirname, 'src/index.tsx'),
      doom: path.resolve(__dirname, 'src/script/index.ts'),
      vendor: vendor
    },
    output: {
      filename: 'js/[name].[contenthash].js', // output
      chunkFilename: 'js/[id].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      }),
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '.',
            filter: (name) => {
              return !name.endsWith('index.html')
            }
          }
        ]
      }),
      new ESLintPlugin({
        extensions: ['.tsx', '.ts', '.js', '.jsx']
      })
    ],
    devtool: isProduction ? false : 'source-map',
    mode: env.mode,
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: {
        name: 'runtime'
      },
      flagIncludedChunks: true,
      minimize: true,
      realContentHash: true,
      removeEmptyChunks: true
    },
    module: {
      rules: [
        {
          test: /\.(ts)x?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: path.resolve(__dirname, 'dist/css/')
              }
            },
            {
              loader: 'css-loader',
              options: { sourceMap: !isProduction }
            },
            {
              loader: 'sass-loader', // biên dịch sass sang css
              options: { sourceMap: !isProduction }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|wav|ico)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        },
        {
          test: /\.(png|jpe?g|gif|)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'assets/imgs'
            }
          }
        },
        {
          test: /\.mp3$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'assets/music'
            }
          }
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },

      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devServer: {
      compress: true,
      hot: true,
      open: true,
      historyApiFallback: true,
      port: 4000,
      static: {
        directory: path.join(__dirname, 'public'),
        serveIndex: true,
        watch: true
      },
      watchFiles: {
        paths: ['src/**/*.*'],
        options: {
          usePolling: true
        }
      }
    }
  }

  if (isProduction) {
    config.plugins = [
      ...config.plugins,
      new webpack.ProgressPlugin(),

      new CompressionPlugin({
        test: /\.(css|js)$/,
        algorithm: 'brotliCompress'
      }),
      new CleanWebpackPlugin()
    ]
    if (isAnalyze) {
      config.plugins = [...config.plugins, new BundleAnalyzerPlugin()]
    }
    config.optimization = {
      minimizer: [`...`, new CssMinimizerPlugin()]
    }
  }

  return config
}
