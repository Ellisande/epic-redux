var path = require('path');

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: [
        path.join(__dirname, 'server'),
        path.join(__dirname, 'src/js'),
        path.join(__dirname, 'config'),
        path.join(__dirname, 'shared')
      ],
      loader: 'babel-loader'
    }]
  }
};
