const path = require('path');
const paths = require('./paths');
var baseConfig = require('./webpack.config');

/* webpack plugins */
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const production = {
    plugins: [
        new CleanWebpackPlugin(paths.appBuild, {
            root: path.resolve(__dirname, '../'),
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                comparisons: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                comments: false,
                ascii_only: true,
            },
            sourceMap: false,
        })
    ]
};
module.exports = merge(baseConfig, production);