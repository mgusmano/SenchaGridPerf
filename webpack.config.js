const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function () {
  return {
    mode: 'production',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Sencha Grid Performance',
        template: 'index.html'
      }),
      new CopyPlugin({
        patterns: [
          { from: 'assets', to: 'assets' },
          { from: 'ext-runtime', to: 'ext-runtime' },
        ],
      })
    ],
    entry: './index.js',
    output: {
      filename: `sencha-grid-perf.js`,
      path: path.join(__dirname, './dist')
    }
  }
}
