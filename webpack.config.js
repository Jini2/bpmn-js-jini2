const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    bundle: ['./app/app.js']
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [ '@babel/plugin-transform-react-jsx'  ]
          }
        }
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' }
            ]
          },
          {
            test: /\.bpmn$/,
            use: 'raw-loader',
          },
          {
            exclude: /\.(js|html|json)$/,
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
      { from: 'css/font-awesome.min.css', to: 'vendor/font-awesome/css', context: 'node_modules/font-awesome/' },
      { from: 'fonts/**', to: 'vendor/font-awesome', context: 'node_modules/font-awesome/' },
      { from: 'assets/**', to: 'vendor/diagram-js-minimap', context: 'node_modules/diagram-js-minimap/' },
      { from: 'index.html', context: 'app/' }
    ])
  ],
  mode: 'development',
  devtool: 'source-map'
};