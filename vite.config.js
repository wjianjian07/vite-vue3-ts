import { defineConfig } from "vite";
import { resolve } from "path";
import vue from '@vitejs/plugin-vue';
const inter = require("./proxy.ts")

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

const port = 8086
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    publicDir: "public", //静态资源服务的文件夹
    logLevel: "info", //控制台输出的级别 info 、warn、error、silent
    clearScreen: true, // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
    alias: {
      "/@": pathResolve("src"),
    },
    conditions: [], // 情景导出 package.json 配置中的exports字段
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 导入时想要省略的扩展名列表,不建议使用 .vue 影响IDE和类型支持
  },

  // 强制预构建插件包
  optimizeDeps: {
    entries: [],  //检测需要预构建的依赖项
    include: ['axios'], //默认情况下，不在 node_modules 中的，链接的包不会预构建
    exclude: [], //排除在优化之外
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser' // 混淆器
  },
  server: {
    port: port, // 端口号
    cors: true,
    open: false, // 自动在浏览器打开    
    https: false, // 是否开启 https
    proxy: inter.proxy,
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
  }
});