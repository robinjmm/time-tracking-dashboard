import {defineConfig} from "vite";
import {createHtmlPlugin} from "vite-plugin-html";
import postPresetEnv from "postcss-preset-env";
import purgeCSSPlugin from "@fullhuman/postcss-purgecss";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@styles": path.resolve(__dirname, "./scss"),
            "@fontawesome": path.resolve(__dirname, "./node_modules/@fortawesome/fontawesome-free/css/")
        }
    },
    plugins: [
        createHtmlPlugin({
            minify: true
        })
    ],
    css: {
        postcss: {
            plugins: [
                postPresetEnv,
                purgeCSSPlugin({
                    content: ["./index.html"],
                    variables: true,
                    keyframes: true
                })
            ]
        }
    }
})