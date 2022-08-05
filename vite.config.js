import { defineConfig } from "vite";
import { resolve } from "path";
import vue from '@vitejs/plugin-vue';
import postcssImport from "postcss-import"
import autoprefixer from "autoprefixer" //css前缀，用于兼容
import tailwindcss from "tailwindcss" //优化css，打包删除未使用到的样式
import viteCompression from 'vite-plugin-compression'; //打包代码压缩
const inter = require("./proxy.ts")

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

const port = 8086
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    viteCompression({
      //生成压缩包gz
      verbose: true, // 输出压缩成功
      disable: false, // 是否禁用
      threshold: 1, // 体积大于阈值会被压缩，单位是b
      algorithm: 'gzip', // 压缩算法
      ext: '.gz',// 生成的压缩包后缀
    })
  ],
  // css 语言处理
  css: {
    postcss: {
      plugins: [
        postcssImport,
        autoprefixer,
        tailwindcss
      ]
    }
  },
  resolve: {
    publicDir: "public", //静态资源服务的文件夹
    logLevel: "info", //控制台输出的级别 info 、warn、error、silent
    clearScreen: true, // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
    alias: {
      "@": pathResolve("src"),
      "views": pathResolve("src/view"),
      "utils": pathResolve("src/commonJs"),
      "#": pathResolve("src/assets")
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
    minify: 'terser', // 混淆器
    terserOptions: { //生产环境下清空console.log
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: { //打包出的文件整理
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: port, // 端口号
    cors: true,
    open: true, // 自动在浏览器打开    
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