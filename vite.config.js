import { defineConfig } from "vite";
import { resolve } from "path";
import vue from '@vitejs/plugin-vue';
const inter = require("./proxy.ts")

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

const port = 8086
export default defineConfig({
  base: "",
  plugins: [vue()],
  resolve: {
    alias: {
      "/@": pathResolve("src"),
    }
  },
  optimizeDeps: {
    include: ['axios'],
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