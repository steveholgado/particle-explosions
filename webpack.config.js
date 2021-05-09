const path = require('path')
const dts = require('dts-bundle')

var rootDir = path.resolve(__dirname)
function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    dts.bundle({
      name: 'particle-explosions',
      main: path.join(__dirname, '/src/index.d.ts'),
      out: path.join(__dirname, '/dist/particle-explosions.d.ts'),
      removeSource: true,
      outputAsModuleFolder: true 
    })
  })
}

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'particle-explosions.min.js',
    library: 'particleExplosions',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new DtsBundlePlugin()
  ]
}
