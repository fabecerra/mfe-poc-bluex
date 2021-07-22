const { ModuleFederationPlugin } = require('webpack').container;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 7000,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   loader: 'babel-loader',
      //   options: {
      //     envName: 'client',
      //     plugins: ['@babel/plugin-syntax-dynamic-import']
      //   },
      //   exclude: /node_modules/
      // },
      {
        test: /\.(js|jsx)$/,
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
  plugins: [
    new ModuleFederationPlugin({
      name: 'appshell',
      filename: 'remoteEntry.js',
      library: {
        type: 'var',
        name: 'appshell',
      },
      exposes: {

      },
      remotes: {
        // app1: 'app1@http://localhost:7001/remoteEntry.js',
        app2: 'app2',
        app3: 'app3',
      },
      shared: {
        ...deps,
        react: {
          import: 'react',
          shareKey: 'react',
          shareScope: 'default',
          singleton: true,
          eager: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
        'styled-components': {
          singleton: true
        },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new HtmlWebpackTagsPlugin({
      tags: [
        // `http://localhost:7001/remoteEntry.js`,
        `http://localhost:7002/remoteEntry.js`,
        `http://localhost:7003/remoteEntry.js`
      ],
      append: false, // prepend this as needs to be loaded before application-home
      publicPath: false,
    })
  ],
};
