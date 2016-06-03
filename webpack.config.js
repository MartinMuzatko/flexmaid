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
    loaders: [
        { test: /\.html$/, loader: 'riotjs' },
        { test: /\.js$/, loader: 'babel', query: { presets: 'es2015-riot' } },
        {
            test: /\.css$/,
            loaders: [
                'style',
                'css',
                'postcss'
            ]
        },
        {
            test: /\.scss$/,
            loaders: [
                'style',
                'css',
                'sass'
            ]
        },
        {
            test: /\.less$/,
            loaders: [
                'style',
                'css',
                'less'
            ]
        }
    ]
}
