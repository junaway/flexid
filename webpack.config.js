import path from 'path';
import { ESBuildMinifyPlugin } from 'esbuild-loader'

const config = {
    entry: './src/uuid.js',
    output: {
        filename: 'main.js',
        path: path.resolve(),
    },
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es2015'
            })
        ]
    },
};

console.log(config);

export default config;