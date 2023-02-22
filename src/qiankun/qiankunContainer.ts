import { event, eventKey } from "@/commonJs/global";
import { ACTIONSNAME } from "@/store/actionsName";
import { useQiankunStoreWithOut } from "@/store/modules/qiankun";
import {
  addGlobalUncaughtErrorHandler,
  LoadableApp,
  loadMicroApp,
  RegistrableApp,
  removeGlobalUncaughtErrorHandler,
} from "qiankun";
import { SYSTEMLISTITEMPROP } from "types/qiankun";
import { deepClone } from "utils/index";
import Loading from "@/server/loading";

const loading = new Loading();

// 添加全局的未捕获异常处理器并移除全局的未捕获异常处理器
addGlobalUncaughtErrorHandler((event) =>
  removeGlobalUncaughtErrorHandler((event) => event)
);

// 是否生产环境
const NODE_ENV: boolean = import.meta.env.NODE_ENV === "production";
// qiankun缓存器
const useQiankunStore = useQiankunStoreWithOut();
// microApp-手动挂载node； domTpl-临时容器盒子
let microApp: Indexable, domTpl: HTMLDivElement;
// 主应用路径
const MAIN_ROUTER_PATH = "";
// 乾坤子系统容器列表
let SYSTEMLIST: RegistrableApp<SYSTEMLISTITEMPROP>[] = [];

/**
 * 获取需注册子系统
 * @returns containerList 乾坤子系统容器列表
 */
const getSystemItemList = async () => {
  // let list = await getContainerList(); // 获取子应用项目列表
  let list: any[] = [
    //portal列表
    {
      name: "first",
      path: "demoPath",
      localPath: "http://localhost:8081/",
    },
    {
      name: "secound",
      path: "demoPath",
      localPath: "http://localhost:8082/",
    },
  ];
  if (!NODE_ENV) {
    // 是否优先加载服务端的 portal 列表
    const portalFirst = false;
    // 本地服务列表
    const localList = [
      {
        name: "demo",
        path: "demoApp",
        localPath: "http://localhost:8099/",
      },
    ];
    if (portalFirst) {
      list.push(...localList);
    } else {
      const names = list.map((v) => v.name);
      localList.forEach((item) => {
        if (!names.includes(item.name)) {
          list.unshift(item);
        }
      });
    }
    // list.forEach((item) => {
    //   if (item.name === "center") {
    //     item.localPath = "http://localhost:8082/";
    //   } else if (item.name === "taglib") {
    //     item.localPath = "http://localhost:8083/";
    //   } else if (item.name === "group") {
    //     item.localPath = "http://localhost:8084/";
    //   } else if (item.name === "portrait" || item.name === "employeePortrait") {
    //     item.localPath = "http://localhost:8085/";
    //   } else if (item.name === "oa") {
    //     item.localPath = "http://localhost:8086/";
    //   } else if (item.name === "strategy") {
    //     item.localPath = "http://localhost:8086/";
    //   } else if (item.name === "demo") {
    //     item.localPath = "http://localhost:8099/";
    //   }
    // });
  }
  SYSTEMLIST = list.map((item) => {
    return {
      name: item.name,
      entry: NODE_ENV ? "/" + item.path + "/" : item.localPath,
      container: "#qiankun",
      activeRule: (e) => {
        return new RegExp(new RegExp("#/" + item.name + "/")).test(e.hash);
      },
      props: {
        padding: item.padding === "false" ? false : true,
        mainRouterPath: MAIN_ROUTER_PATH,
        getGlobalState: useQiankunStore[ACTIONSNAME.QIANKUN.GET_GLOBAL_STATE],
        setGlobalState: useQiankunStore[ACTIONSNAME.QIANKUN.SET_GLOBAL_STATE],
        getComponent: useQiankunStore[ACTIONSNAME.QIANKUN.GET_COMPONENTS],
        LoadMicroApp: customLoadMicroApp,
        event: event,
        eventKey: eventKey,
      },
    };
  });
  window.$systemList = SYSTEMLIST;
  return SYSTEMLIST;
};

/**
 * @description 手动全局挂载模块，用于组件获取
 * @param {String} name 模块名称
 * @param {Function} callback 挂载完整回调
 * @returns
 */
const customLoadMicroApp = (
  name: string,
  callback: Function | undefined,
  errorCallback: Function | undefined
) => {
  let obj = SYSTEMLIST.find((item) => {
    return item.name == name;
  }) as RegistrableApp<SYSTEMLISTITEMPROP>;
  //判断是否已经加载
  let dom = document.body.querySelector(`#cache_${obj.name}`);
  if (dom) {
    if (microApp[obj.name]?.empty) {
      if (typeof errorCallback === "function") {
        errorCallback();
      }
    } else {
      if (typeof callback === "function") {
        callback();
      }
    }
    return false;
  }
  removeMicroApp();
  loading.openLoading();
  //如果没加载过的，即加载
  if (obj) {
    let clsObj = deepClone(obj, ["props"]) as LoadableApp<SYSTEMLISTITEMPROP>;
    //  clsObj.name=`cache_${clsObj.name}`;
    //  clsObj.container = `#${clsObj.name}`;
    clsObj = Object.assign({}, clsObj, {
      name: `cache_${clsObj.name}`,
      container: `#${clsObj.name}`,
    });
    //更换路由防止切换页面，导致接口调用
    // clsObj.props.mainRouterPath=`cache_${clsObj.name}`;
    let containerDom = document.createElement("div");
    containerDom.setAttribute("id", `${clsObj.name}`);
    containerDom.style.display = "none";
    document.body.appendChild(containerDom);
    setTimeout(() => {
      microApp[obj.name] = loadMicroApp(clsObj, {
        singular: true,
      });
      microApp[obj.name].mountPromise
        .then((res: any) => {
          loading.closeLoading();
          if (typeof callback === "function") {
            callback();
          }
        })
        .catch((err: any) => {
          microApp[obj.name].empty = true;
          loading.closeLoading();
          if (typeof errorCallback === "function") {
            errorCallback(err);
          }
        });
      // 卸载后再补充dom，解决部分样式丢失的问题
      microApp[obj.name].unmountPromise.then((res: any) => {
        (document.body.querySelector(`#${clsObj.name}`) as Element).appendChild(
          domTpl
        );
      });
    }, 100);
  }
};

// 载入新模块时需要检查是否有共享过，有则执行unmount
const removeMicroApp = (name: string = "") => {
  if (name === "") {
    if (microApp[name]) {
      domTpl = document.createElement("div");
      domTpl.style.display = "none";
      domTpl.innerHTML = (
        document.body.querySelector(`#cache_${name}`) as Element
      ).innerHTML;
      microApp[name].unmount();
    }
  } else {
    Object.keys(microApp).forEach((item) => {
      if (microApp[item]) {
        domTpl = document.createElement("div");
        domTpl.style.display = "none";
        domTpl.innerHTML = (
          document.body.querySelector(`#cache_${item}`) as Element
        ).innerHTML;
        microApp[item].unmount();
      }
    });
  }
};
export {
  getSystemItemList,
  customLoadMicroApp,
  removeMicroApp
}
