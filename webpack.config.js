import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: './client/index.tsx',
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/dist`,
        publicPath: '/'
    },
    devtool:'inline-source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
      },
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
                test: /\.(t|j)sx?$/, 
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "source-map-loader",
                }
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './client/index.html' })],
}