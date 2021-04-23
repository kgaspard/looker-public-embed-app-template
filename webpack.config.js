const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    lookerDashboardEmbed: './middlewares/lookerDashboardEmbed.js',
    lookerExploreEmbed: './middlewares/lookerExploreEmbed.js',
    lookerLookEmbed: './middlewares/lookerLookEmbed.js',
    lookerApiCallEmbedHelper: './middlewares/lookerApiCallEmbedHelper.js',
    lookerApiCallEmbed: './middlewares/lookerApiCallEmbed.js',
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/javascripts'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            // '@babel/preset-env',
            {
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          ]
        },
      }
    ],
  }
};