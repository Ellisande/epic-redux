var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');

// var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  addVendor: function (vendorName, moduleLocation) {
    moduleLocation = path.join(__dirname, moduleLocation);
    this.resolve.alias[vendorName] = moduleLocation;
    // this.module.noParse.push(new RegExp(moduleLocation));
  },
  entry: [
    // 'bootstrap-webpack!./bootstrap.config.js',
    path.resolve(ROOT_PATH, 'src/js/main')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {}
  },
  output: {
    path: path.resolve(ROOT_PATH, 'assets'),
    filename: 'bundle.js'
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: ['src/js', 'server/lib', 'config'].map( function(item) { return path.join(__dirname, item); } ),
        loaders: ['babel'],
      },
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  // This allows us to use node modules like request in the browser:
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

// if(TARGET === 'build') {
module.exports = merge(common, {
  module: {
    loaders: [
      {
        // test for both js and jsx
        test: /\.jsx?$/,

        // use babel loader with Stage 1 features
        loader: 'babel-loader',

        // operate only on our app directory
        include: [
          path.resolve(ROOT_PATH, 'react'),
          path.resolve(ROOT_PATH, 'shared')
        ],

        query: {
          presets: ['es2015', 'stage-1', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('development')
      }
    })
    // TODO: (ge 12/24/15) Minification needs to go back in for production and this file needs to be fixed for dev/prod mode
    // ,
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
});
// }

// if(TARGET === 'dev') {
//   module.exports = merge(common, {
//     entry: [
//       'webpack/hot/dev-server'
//     ],
//     module: {
//       loaders: [
//         {
//           test: /\.jsx?$/,
//           loaders: ['react-hot', 'babel?stage=1'],
//           include: path.resolve(ROOT_PATH, 'react')
//         }
//       ]
//     }
//   });
// }
