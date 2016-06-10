const path = require('path')
const webpack = require('webpack')

const phaserModule = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'game.js'
  },
  module: {
    loaders: [
      { test: /pixi.js/, loader: 'script' }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2
    }
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
    process.env.NODE_ENV === 'production'
      ? new webpack.optimize.UglifyJsPlugin({minimize: true})
    : () => {}
  ],
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : 'cheap-module-source-map',
  debug: process.env.NODE_ENV !== 'production'
}
