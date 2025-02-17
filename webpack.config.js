import * as path from "node:path";
import TerserPlugin from "terser-webpack-plugin";

export default {
    mode: "production",
    target: [ "es2020" ],
    entry: "./src/index.ts",
    output: {
        path: path.resolve("./build/packs/editor_bp/scripts"),
        filename: "index.js",
        chunkFormat: "commonjs",
    },
    resolve: { extensions: [ ".ts", ".tsx", ".js" ] },
    experiments: { outputModule: true },
    externalsType: "module",
    externals: {
        "@minecraft/common": "@minecraft/common",
        "@minecraft/debug-utilities": "@minecraft/debug-utilities",

        "@minecraft/server": "@minecraft/server",
        "@minecraft/server-ui": "@minecraft/server-ui",
        "@minecraft/server-net": "@minecraft/server-net",
        "@minecraft/server-admin": "@minecraft/server-admin",
        "@minecraft/server-gametest": "@minecraft/server-gametest",

        "@minecraft/server-editor": "@minecraft/server-editor",
        "@minecraft/server-editor-bindings":
            "@minecraft/server-editor-bindings",
    },
    module: { rules: [{ test: /\.tsx?$/, loader: "ts-loader" }] },
    plugins: [
        new TerserPlugin({
            terserOptions: {
                output: { comments: false },
            },
        }),
    ],
};
