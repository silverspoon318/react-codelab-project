var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './src/index.js',
        './src/style.css'
    ],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    resolve: {
        root: path.resolve('./src')
    },
    // devServer: {
    //     hot: true,
    //     inline: true,
    //     host: '0.0.0.0',
    //     port: 4000,
    //     contentBase: __dirname + '/public/',
    // },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
