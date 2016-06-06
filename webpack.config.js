var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')

module.exports = {
    entry: './index.js',
    output: {
        path: './',
        filename: 'bundle.js',
        publicPath: ''
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
            { test: /\.less$/, loader: 'style!css!postcss!less' },
            { test: /\.js$/, loader: 'babel', query: { presets: 'es2015-riot' } }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    devServer: {
        port: 7070,
        outputPath: __dirname,
        inline: false,
        progress: true,
    },
}
