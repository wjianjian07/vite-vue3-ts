import { AppRouteModule } from "@/router/types";
const LAYOUT = () => import("views/layout.vue");
// import { t } from '/@/hooks/web/useI18n';

const layout: AppRouteModule = {
  path: "/layout",
  name: "Layout",
  component: LAYOUT,
  redirect: "/layout/index",
  meta: {
    orderNo: 10,
    icon: "ion:grid-outline",
    title: "Layout",
  },
  children: [
    {
      path: "index",
      name: "Index",
      component: () => import("views/home/index.vue"),
      meta: {
        // affix: true,
        title: "Index",
      },
    },
    // {
    //   path: "workbench",
    //   name: "Workbench",
    //   component: () => import("views/layout/workbench/index.vue"),
    //   meta: {
    //     title: "Workbench",
    //   },
    // },
  ],
};

export default layout;
