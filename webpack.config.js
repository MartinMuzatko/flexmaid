var webpack = require('webpack')

module.exports = {
    entry: './index.js',
    output: {
        path: './',
        filename: 'bundle.js',
        publicPath: './'
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        })
    ],
    module: {
        loaders: [
            { test: /\.html$/, loader: 'riotjs' },
            { test: /\.js$/, loader: 'babel', query: { presets: 'es2015-riot' } }
        ]
    }
}
