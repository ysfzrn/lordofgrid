var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
  entry: [path.join(__dirname, '/src/app/lordofgrid.jsx')],
  resolve: {
    //When require, do not have to add these extensions to file's name
    extensions: ["", ".js", ".jsx"]
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  //Render source-map file for final build
  devtool: 'source-map',
  //output config
  output: {
    path: buildPath,   
    filename: 'app.js',
    libraryTarget: 'umd',
    library: 'ysfzrnLib'
  },
  plugins: [
    //Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    //Transfer Files
    new webpack.ProvidePlugin({
            React: "react",
            jQuery: "jquery",
            Radium:"radium",
            color:"color"
        })
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/, //All .js and .jsx files
        loaders: ['babel'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      { test: /\.css$/,   loader: 'style!css' },
      { test: /\.png$/,  loader: "url-loader?limit=100000" },
      { test: /\.eot$/, loader: "url-loader?limit=100000" },
      { test: /\.svg$/, loader: "url-loader?limit=100000" },
      { test: /\.woff$/, loader: "url-loader?limit=100000" },
      { test: /\.woff2$/, loader: "url-loader?limit=100000" },
      { test: /\.ttf$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }

    ]
  },
  //Eslint config
  eslint: {
    configFile: '.eslintrc' //Rules for eslint
  },
};

module.exports = config;
