import { createApp } from "vue";
import App from "./App.vue";
//优化css工具；去除项目未使用的样式
import "tailwindcss/tailwind.css";

// UI框架
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 全局主题样式
import "./style/index.scss";

import router, { setupRouter } from "./router";
import { setupRouterGuard } from "./router/guard";
import { setupStore } from "./store";

function bootStrap() {
  const app = createApp(App);
  // router
  setupRouter(app);
  // router-guard
  setupRouterGuard(router);
  // store
  setupStore(app);

  app.use(ElementPlus).mount("#app");
}
bootStrap();
