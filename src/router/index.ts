import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/view/home/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // 路由守卫逻辑

  // 通过 return turn;
  // 不通过 return false;
  return true;
});

export default router;
