const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
        filename: 'index.html',
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json',
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A simple text editor that works offline!',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread'],
            },
          },
        },
      ],
    },
  };
};
