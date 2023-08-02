// Import required modules and packages.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

// Export a function that returns the webpack configuration.
module.exports = () => {
  return {
    // Set the build mode to 'development'.
    mode: 'development',

    // Entry points for the application.
    entry: {
      main: './src/js/index.js', 
      install: './src/js/install.js', 
    },

    // Output configuration.
    output: {
      filename: '[name].bundle.js', 
      path: path.resolve(__dirname, 'client', 'dist'), 
    },

    // Webpack plugins configuration.
    plugins: [
      // HtmlWebpackPlugin generates an HTML file to serve the webpack bundles.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor',
      }),

      // WebpackPwaManifest generates a web app manifest for the progressive web app.
      new WebpackPwaManifest({
        fingerprints: false, 
        inject: true, 
        name: 'Just Another Text Editor', 
        short_name: 'J.A.T.E', 
        description: 'A simple text editor that works offline!', 
        background_color: '#ffffff', 
        theme_color: '#202A44',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            // Array of icons for the web app.
            src: path.resolve(__dirname, 'src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'), 
          },
        ],
      }),

      // InjectManifest generates a service worker that precaches files and handles dynamic caching.
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'src-sw.js', 
      }),
    ],

    // Module rules configuration.
    module: {
      rules: [
        // Rule for handling CSS files.
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

        // Rule for handling JavaScript files.
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Use 'babel-loader' for JavaScript files.
            options: {
              presets: ['@babel/preset-env'], // Use '@babel/preset-env' for transpiling.
              plugins: [
                '@babel/plugin-transform-runtime', // Use '@babel/plugin-transform-runtime' for transpiling.
                '@babel/plugin-proposal-object-rest-spread', // Use '@babel/plugin-proposal-object-rest-spread' for transpiling.
              ],
            },
          },
        },
      ],
    },
  };
};
