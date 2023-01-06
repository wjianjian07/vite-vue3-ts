import { createApp } from "vue";
import App from "./App.vue";
//优化css工具；去除项目未使用的样式
import "tailwindcss/tailwind.css";

// 全局主题样式
import "./style/index.scss";

import router from "./router";
import store from "./store";
// UI框架
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(ElementPlus).use(router).use(store).mount("#app");
