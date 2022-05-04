const path = require('path');

module.exports = {
  mode: 'development', // {development: 'human-readable', production: 'minified'}
  entry: './client/src/index.jsx',
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'client/public'),
    },
    compress: true,
    port: 3000
  }
}
