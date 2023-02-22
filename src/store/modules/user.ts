import { RoleEnum } from "@/enums/roleEnum";
import { defineStore } from "pinia";
import { UserInfo, UserState } from "types/store";
import store from "..";
import { ACTIONSNAME } from "../actionsName";

export const userStore = defineStore({
  id: "user", // id是唯一的，如果有多个文件，ID不能重复
  state: (): UserState => {
    return {
      userInfo: null,
      token: "",
      roleList: [],
    };
  },
  getters: {
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : [];
    },
  },
  actions: {
    [ACTIONSNAME.USER.SET_INFO](data: UserInfo) {
      this.userInfo = data;
    },
    [ACTIONSNAME.USER.SET_BANK_TYPE](data: string) {
      this.token = data;
    },
    // 用户退出，清除本地数据
    [ACTIONSNAME.USER.LOGOUT]() {
      this.userInfo = null;
      sessionStorage.clear();
      localStorage.clear();
    },
  },
  // 开启数据缓存，在 strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 localStorage
  // 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化，如：paths: ['account'] 替换key的位置
  persist: {
    enabled: true,
    strategies: [
      {
        key: "users",
        storage: localStorage,
      },
    ],
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return userStore(store);
}
