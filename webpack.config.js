import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/dist`,
        publicPath: '/'
    },
    devtool:'eval-source-map',
    devServer: {
        host: 'localhost',
        port: '3000',
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './client/index.html' })],
}