import { defineStore } from "pinia";
import store from "@/store";
import { AppRouteRecordRaw } from "@/router/types";
import { toRaw } from "vue";
import { useUserStoreWithOut } from "./user";
import { filter } from "@/commonJs/treeHelper";
import { useAppStoreWithOut } from "./app";
import { asyncRoutes } from "@/router/routes";
import { PermissionModeEnum } from "@/enums/appEnum";

const projectSetting = {
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
};
// import projectSetting from '/@/settings/projectSetting';

// import { PermissionModeEnum } from '/@/enums/appEnum';

import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic";
import { ACTIONSNAME } from "../actionsName";

interface PermissionState {
  // Permission code list
  permCodeList: string[] | number[];
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  lastBuildMenuTime: number;
  // Backstage menu list
  // backMenuList: Menu[];
  // frontMenuList: Menu[];
}
export const usePermissionStore = defineStore({
  id: "permission",
  state: (): PermissionState => ({
    permCodeList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    // backMenuList: [],
    // menu List
    // frontMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    },
    // getBackMenuList(): Menu[] {
    //   return this.backMenuList;
    // },
    // getFrontMenuList(): Menu[] {
    //   return this.frontMenuList;
    // },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    [ACTIONSNAME.PERMISSION.RESET_STATE](): void {
      this.isDynamicAddedRoute = false;
      // this.permCodeList = [];
      // this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    // async changePermissionCode() {
    //   const codeList = await getPermCode();
    //   this.setPermCodeList(codeList);
    // },
    //: Promise<AppRouteRecordRaw[]>
    async [ACTIONSNAME.PERMISSION.BUILD_ROUTES_ACTION]() {
      // const { t } = useI18n();
      const userStore = useUserStoreWithOut();
      const appStore = useAppStoreWithOut();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      const { permissionMode = projectSetting.permissionMode } =
        appStore.getProjectConfig;

      // 根据身份权限过滤路由
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role: string) => roles.includes(role));
      };
      // 过滤忽略的路由
      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      //   /**
      //    * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
      //    * */
      //  const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
      //     if (!routes || routes.length === 0) return;
      //     let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
      //     function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
      //       if (parentPath) parentPath = parentPath + '/';
      //       routes.forEach((route: AppRouteRecordRaw) => {
      //         const { path, children, redirect } = route;
      //         const currentPath = path.startsWith('/') ? path : parentPath + path;
      //         if (currentPath === homePath) {
      //           if (redirect) {
      //             homePath = route.redirect! as string;
      //           } else {
      //             route.meta = Object.assign({}, route.meta, { affix: true });
      //             throw new Error('end');
      //           }
      //         }
      //         children && children.length > 0 && patcher(children, currentPath);
      //       });
      //     }
      //     try {
      //       patcher(routes);
      //     } catch (e) {
      //       // 已处理完毕跳出循环
      //     }
      //     return;
      //   };

      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          // Convert multi-level routing to level 2 routing
          // routes = flatMultiLevelRoutes(routes);
          break;

        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          // const menuList = transformRouteToMenu(routes, true);
          routes = filter(routes, routeRemoveIgnoreFilter);
          routes = routes.filter(routeRemoveIgnoreFilter);
          // menuList.sort((a, b) => {
          //   return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          // });

          // this.setFrontMenuList(menuList);
          // Convert multi-level routing to level 2 routing
          // routes = flatMultiLevelRoutes(routes);
          break;

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        // case PermissionModeEnum.BACK:
        //   const { createMessage } = useMessage();

        //   createMessage.loading({
        //     content: t('sys.app.menuLoading'),
        //     duration: 1,
        //   });

        //   // !Simulate to obtain permission codes from the background,
        //   // this function may only need to be executed once, and the actual project can be put at the right time by itself
        //   let routeList: AppRouteRecordRaw[] = [];
        //   try {
        //     this.changePermissionCode();
        //     routeList = (await getMenuList()) as AppRouteRecordRaw[];
        //   } catch (error) {
        //     console.error(error);
        //   }

        //   // Dynamically introduce components
        //   routeList = transformObjToRoute(routeList);

        //   //  Background routing to menu structure
        //   const backMenuList = transformRouteToMenu(routeList);
        //   this.setBackMenuList(backMenuList);

        //   // remove meta.ignoreRoute item
        //   routeList = filter(routeList, routeRemoveIgnoreFilter);
        //   routeList = routeList.filter(routeRemoveIgnoreFilter);

        //   routeList = flatMultiLevelRoutes(routeList);
        //   routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
        //   break;
      }

      //   routes.push(ERROR_LOG_ROUTE);
      //   patchHomeAffix(routes);
      //   return routes;
    },
  },
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
