import { defineStore } from "pinia";
import { initGlobalState, LoadableApp } from "qiankun";
import store from "..";
import { ACTIONSNAME } from "../actionsName";
import { CustomMicroAppStateActions, SYSTEMLISTITEMPROP } from "types/qiankun";
import shareList from "../../qiankun/componentShare";
import { deepClone } from "utils/index";
import { toUpperCase } from "@/server/qiankunConfig";

interface ShareComponents extends Indexable {
  module?: string;
  list?: LoadableApp<SYSTEMLISTITEMPROP>[] | [];
}

interface QiankunState extends Indexable {
  initialState: Recordable;
  action?: CustomMicroAppStateActions;
  shareComponents: Indexable;
  shareComponentsCache: ShareComponents[];
}

export const useQiankunStore = defineStore({
  id: "qiankun",
  state: (): QiankunState => ({
    initialState: {}, //初始化共享数据
    shareComponents: {}, // 共享组件
    shareComponentsCache: [], //存在内存，避免组件共享子=》父=》子经过vuex都是钩子报错
  }),
  getters: {
    action(): CustomMicroAppStateActions {
      return initGlobalState(this.initialState);
    },
  },
  actions: {
    [ACTIONSNAME.QIANKUN.SET_GLOBAL_STATE](value: Recordable) {
      this.initialState = value;
      this.action.setGlobalState(this.initialState);
    },
    // 获取父应用 共享数据
    [ACTIONSNAME.QIANKUN.GET_GLOBAL_STATE]() {
      return (this.action.getGlobalState = (callBack: Function) => {
        return callBack(this.initialState);
      });
    },
    //向子应用注册钩子，调用更改父应用的状态
    [ACTIONSNAME.QIANKUN.SET_MAIN_SHARECOMPONENTS](
      shareComponentObj: ShareComponents,
      handleCache = true
    ) {
      let shareComponent = deepClone(this.shareComponents) as Indexable;
      shareComponentObj.list!.forEach((item) => {
        shareComponent[`${shareComponentObj.module}${toUpperCase(item.name)}`] =
          item;
      });
      this.shareComponents = shareComponent;

      if (handleCache) {
        //过滤已存在的
        let findIndex = this.shareComponentsCache.findIndex((item) => {
          return item.module == shareComponentObj.module;
        });
        if (findIndex == -1) {
          this.componentShareCache.push(deepClone(shareComponentObj));
        }
      }
    },
    //向子应用注册钩子，供子应用获取分享的组件
    [ACTIONSNAME.QIANKUN.GET_COMPONENTS](callBack: Function) {
      //过滤已存在的
      let findIndex: number = this.shareComponentsCache.findIndex(
        (item: ShareComponents) => {
          return item.module == shareList.module;
        }
      );
      if (findIndex === -1) {
        this.shareComponentsCache.push(deepClone(shareList));
      }
      callBack(this.shareComponentsCache);
    },
  },
});

// Need to be used outside the setup
export function useQiankunStoreWithOut() {
  return useQiankunStore(store);
}
