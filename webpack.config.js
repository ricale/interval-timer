const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(wav|mp3)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions:    path.resolve(__dirname, './src/actions'),
      components: path.resolve(__dirname, './src/components'),
      constants:  path.resolve(__dirname, './src/constants'),
      lib:        path.resolve(__dirname, './src/lib'),
      reducers:   path.resolve(__dirname, './src/reducers'),
      themes:     path.resolve(__dirname, './src/themes'),

      public: path.resolve(__dirname, './public'),
    },
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9999,
    host: '0.0.0.0',
  },
};
