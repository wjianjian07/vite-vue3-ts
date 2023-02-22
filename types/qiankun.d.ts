import { MicroAppStateActions } from "qiankun";
import { Emitter } from "mitt";

interface SYSTEMLISTITEMPROP {
  padding?: boolean,
  getGlobalState?: (callBack: any) => void, //向子应用注册钩子，获取父应用的状态
  setMainStore?: (model_key: string, value: any, handleCache?: boolean) => void, //向子应用注册钩子，调用更改父应用的状态
  getComponent?: (callBack: function) => void, //向子应用注册钩子，供子应用获取分享的组件
  LoadMicroApp?: (name: any, callback: any, errorCallback: any) => false | undefined // 手动全局挂载模块，用于组件获取
  event?: Emitter<any>, // vue全局事件注册/监听
  eventKey?: Indexable<string>,
}

interface CustomMicroAppStateActions extends MicroAppStateActions {
  getGlobalState?: (callBack: any) => void, //注册自定义获取state钩子
  getComponent?: (callBack: any) => void  // 注册自定义获取父组件的钩子
}