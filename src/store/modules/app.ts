// import type {
//   ProjectConfig,
//   HeaderSetting,
//   MenuSetting,
//   TransitionSetting,
//   MultiTabsSetting,
// } from '/#/config';
// import type { BeforeMiniState } from '/#/store';

import { defineStore } from "pinia";
import { ProjectConfig } from "types/store";
import store from "..";
import { ThemeEnum } from "@/enums/appEnum";
import { resetRouter } from "@/router";
import { ACTIONSNAME } from "../actionsName";

// import { defineStore } from 'pinia';
// import { store } from '/@/store';

// import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '/@/enums/cacheEnum';
// import { Persistent } from '/@/utils/cache/persistent';
// import { darkMode } from '/@/settings/designSetting'
// import { deepMerge } from '/@/utils';

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  // beforeMiniInfo: BeforeMiniState;
}
let timeId: Nullable<any>;
export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: {} as ProjectConfig,
    // beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): "light" | "dark" | string {
      return (
        this.darkMode || localStorage.getItem("app-dark-mode-key") || "blue"
      );
    },

    // getBeforeMiniInfo() {
    //   return this.beforeMiniInfo;
    // },

    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },

    // getHeaderSetting() {
    //   return this.getProjectConfig.headerSetting;
    // },
    // getMenuSetting() {
    //   return this.getProjectConfig.menuSetting;
    // },
    // getTransitionSetting() {
    //   return this.getProjectConfig.transitionSetting;
    // },
    // getMultiTabsSetting() {
    //   return this.getProjectConfig.multiTabsSetting;
    // },
  },
  actions: {
    [ACTIONSNAME.APP.SET_PAGE_LOADING](loading: boolean): void {
      this.pageLoading = loading;
    },

    // setDarkMode(mode: ThemeEnum): void {
    //   this.darkMode = mode;
    //   localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    // },

    // setBeforeMiniInfo(state: BeforeMiniState): void {
    //   this.beforeMiniInfo = state;
    // },

    // setProjectConfig(config: DeepPartial<ProjectConfig>): void {
    //   this.projectConfig = deepMerge(this.projectConfig || {}, config);
    //   Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    // },

    async [ACTIONSNAME.APP.RESET_ALL_STATE]() {
      resetRouter();
      // Persistent.clearAll();
      localStorage.clear(), sessionStorage.clear();
    },
    async [ACTIONSNAME.APP.SET_PAGELOADING_ACTION](
      loading: boolean
    ): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
