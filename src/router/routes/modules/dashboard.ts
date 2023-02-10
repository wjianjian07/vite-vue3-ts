import { AppRouteModule } from "@/router/types";
const LAYOUT = () => import("views/laout.vue");
// import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: "/dashboard",
  name: "Dashboard",
  component: LAYOUT,
  redirect: "/dashboard/analysis",
  meta: {
    orderNo: 10,
    icon: "ion:grid-outline",
    title: "Dashboard",
  },
  children: [
    {
      path: "analysis",
      name: "Analysis",
      component: () => import("views/dashboard/analysis/index.vue"),
      meta: {
        // affix: true,
        title: "Analysis",
      },
    },
    {
      path: "workbench",
      name: "Workbench",
      component: () => import("views/dashboard/workbench/index.vue"),
      meta: {
        title: "Workbench",
      },
    },
  ],
};

export default dashboard;
