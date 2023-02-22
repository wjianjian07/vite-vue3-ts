import { defineStore } from "pinia";
import { initGlobalState } from "qiankun";
import store from "..";
import { ACTIONSNAME } from "../actionsName";
import { CustomMicroAppStateActions } from "types/qiankun";
import shareList from "../../qiankun/componentShare";
import { deepClone } from "utils/index";

interface ShareComponents extends Indexable {
  module?: string;
  list?: Indexable<Element> | [];
}

interface QiankunState {
  initialState: Recordable;
  action?: CustomMicroAppStateActions;
  shareComponents: ShareComponents[];
}

export const useQiankunStore = defineStore({
  id: "qiankun",
  state: (): QiankunState => ({
    initialState: {}, //初始化共享数据
    shareComponents: [], // 共享组件
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
    //向子应用注册钩子，供子应用获取分享的组件
    [ACTIONSNAME.QIANKUN.GET_COMPONENTS](callBack: Function) {
      //过滤已存在的
      let findIndex: number = this.shareComponents.findIndex((item) => {
        return item.module == shareList.module;
      });
      if (findIndex === -1) {
        this.shareComponents.push(deepClone(shareList));
      }
      callBack(this.shareComponents);
    },
  },
});

// Need to be used outside the setup
export function useQiankunStoreWithOut() {
  return useQiankunStore(store);
}
