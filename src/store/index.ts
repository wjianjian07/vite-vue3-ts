import { App } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist"; //数据持久化插件

const store = createPinia();
store.use(piniaPluginPersist);

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
