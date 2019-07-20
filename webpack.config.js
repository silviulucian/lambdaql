const slsWebpack = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: slsWebpack.lib.entries,
    target: 'node',

    // Generate sourcemaps for proper error messages
    devtool: 'source-map',

    // Since 'aws-sdk' is not compatible with webpack,
    // we exclude all node dependencies
    externals: [nodeExternals()],

    mode: slsWebpack.lib.webpack.isLocal ? 'development' : 'production',
    optimization: {
        // We do not want to minimize our code.
        minimize: false,
    },
    performance: {
        // Turn off size warnings for entry points
        hints: false,
    },

    // Run babel on all .js files and skip those in node_modules
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: __dirname,
            exclude: /node_modules/,
        }],
    },
    plugins: [
        new copyWebpackPlugin([
            {from: '.env*', to: '.'},
        ]),
    ],
}
