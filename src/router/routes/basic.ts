import { AppRouteRecordRaw } from "../types";

// 基本静态路由名称
export const basicRouteName = {
  REDIRECT_NAME: "Redirect",
  ERRORPAGE_NAME: "ErrorPage",
};

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: basicRouteName.ERRORPAGE_NAME,
  component: () => import("@/view/errorPage.vue"),
  meta: {
    title: basicRouteName.ERRORPAGE_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  // children: [
  //   {
  //     path: '/:path(.*)*',
  //     name: PAGE_NOT_FOUND_NAME,
  //     component: EXCEPTION_COMPONENT,
  //     meta: {
  //       title: 'ErrorPage',
  //       hideBreadcrumb: true,
  //       hideMenu: true,
  //     },
  //   },
  // ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: "/redirect",
  component: () => import("@/view/home/index.vue"),
  name: basicRouteName.REDIRECT_NAME,
  meta: {
    title: basicRouteName.REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: basicRouteName.REDIRECT_NAME,
      component: () => import("@/view/home/index.vue"),
      meta: {
        title: basicRouteName.REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};
