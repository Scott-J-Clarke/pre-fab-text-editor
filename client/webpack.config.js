// Where/How do I import 'CSS loaders'?
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
// In the content of 'workbox-webpack-plugin', { InjectManifest } will make a service worker for the app.
// What am I meant to do with 'InjectManifest'?
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // This whole 'plugins' section is copied from Activity 26:
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Is this right?
        title: 'TODOs List' // This doesn't seem right because 'TODOs List' was Activity 26 title (?).
      }),

      new GenerateSW(),
      new WebpackPwaManifest({
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('assets/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
            
          }
        ]
      }),
    ],

    // Added 'babel' to 'webpack.config.js':
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
    // Added 'CSS loaders' to 'webpack.config.js': 
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
