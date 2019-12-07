const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'game.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    process.env.NODE_ENV === 'production'
      ? new webpack.optimize.UglifyJsPlugin({ minimize: true })
      : () => {}
  ],
  devtool:
    process.env.NODE_ENV !== 'production'
      ? 'source-map'
      : 'cheap-module-source-map'
}
