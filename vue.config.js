const path = require("path");
const sourceMap = process.env.NODE_ENV === "development";


module.exports = {
    publicPath: "/",
    outputDir: "dist",
    configureWebpack : config => {
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            config.mode = "production";
        } else {
            // 为开发环境修改配置...
            config.mode = "development";
        }
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
                alias: {
                    vue$: "vue/dist/vue.js",
                    "@": path.resolve(__dirname, "./src"),
                    "@c": path.resolve(__dirname, "./src/components"),
                    "scss": path.resolve(__dirname, "./src/scss"),
                    "views": path.resolve(__dirname, "./src/views"),
                }
            }
        });
    },
    productionSourceMap: sourceMap,
    devServer: {
        port: 7080, //8080,
    }
}