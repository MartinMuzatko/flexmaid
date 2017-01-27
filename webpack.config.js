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
    module: {
        preLoaders: [
            { test: /tags\/.*\.html$/, loader: 'riotjs' },
            { test: /template\/.*\.html$/, loader: 'html' }
        ],
        loaders: [
            {
                test: /\.(jpe?g|png|gif|svg|mp4)$/i,
                loader:'file-loader'
            },
            { test: /\.less$/, loader: 'css!postcss!less' },
            { test: /\.js$|\.html$/, loader: 'babel', query: { presets: 'es2015-riot' } }
        ],
        postLoaders: [
            { test: /\.less$/, loader: 'style' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        }),
        new webpack.optimize.UglifyJsPlugin({warnings: false}),
    ],
    postcss: function () {
        return [autoprefixer({browsers: 'last 2 versions'})];
    },
    devServer: {
        port: 8080,
        outputPath: __dirname,
        inline: false,
        progress: true,
    },
}
