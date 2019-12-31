const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  },
};
