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
            {
                test: /\.(jpe?g|png|gif|svg|mp4)$/i,
                loader:'file-loader'
            },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.js$/, loader: 'babel', query: { presets: 'es2015-riot' } }
        ]
    }
}
