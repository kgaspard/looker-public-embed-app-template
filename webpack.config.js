const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    lookerDashboardEmbed: './middlewares/lookerDashboardEmbed.js',
    lookerExploreEmbed: './middlewares/lookerExploreEmbed.js',
    lookerLookEmbed: './middlewares/lookerLookEmbed.js',
    lookerApiCallEmbed: './middlewares/lookerApiCallEmbed.js',
    lookerApiCallEmbedSimple: './middlewares/lookerApiCallEmbedSimple.js',
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
};