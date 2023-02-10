import { AppRouteModule, AppRouteRecordRaw } from "../types";

const modules = import.meta.globEager("./modules/**/*.ts");
const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

console.log(modules, routeModuleList, "modules");

const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Home",
  component: () => import("@/view/home/index.vue"),
  meta: {
    title: "Home",
  },
};
const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/view/login.vue"),
  meta: {
    title: "Login",
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  // ...mainOutRoutes,
  // REDIRECT_ROUTE,
  // PAGE_NOT_FOUND_ROUTE,
];
