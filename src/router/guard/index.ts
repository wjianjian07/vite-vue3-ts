import { Router } from "vue-router";
import nProgress from "nprogress";
import { unref } from "vue";

// 路由守卫主入口
export function setupRouterGuard(router: Router) {
  createProgressGuard(router);
}

export function createProgressGuard(router: Router) {
  // const { getOpenNProgress } = useTransitionSetting();
  router.beforeEach(async (to) => {
    // unref(getOpenNProgress) && nProgress.start();
    nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    // unref(getOpenNProgress) && nProgress.done();
    nProgress.done();
    return true;
  });
}
