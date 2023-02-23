// import store from '../store/index';
// import portalModuleStoreKey from './../store/portalModule/mutationType';
// import { setGlobalParamsForUrl } from './../commonJS/common';

import { LifeCycleFn, LoadableApp } from "qiankun";
import { SYSTEMLISTITEMPROP } from "types/qiankun";

const beforeLoad = (pageName: LoadableApp<SYSTEMLISTITEMPROP>) => {
  return new Promise((resolve, reject) => {
    resolve("");
  });
};

const afterMount = (pageName: LoadableApp<SYSTEMLISTITEMPROP>) => {
  // store.commit(portalModuleStoreKey.getKey(portalModuleStoreKey.CM_ROUTEINIT), true);
  // setGlobalParamsForUrl(pageName);
  return new Promise((resolve, reject) => {
    resolve("");
  });
};

export { beforeLoad, afterMount };
