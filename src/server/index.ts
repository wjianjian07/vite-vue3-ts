// index.ts
import axios, { AxiosResponse } from "axios";
import { getToken } from "../commonJs/authority";
import loading from "./loading";
import { deepClone } from "../commonJs";
import { showMsg, showCodeMsg, getErrResultData } from "./httpError";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { RequestConfig, RequestInterceptors } from "./types";
import { ResultEnum } from "@/enums/httpEnum";

const TIME_OUT: number = 10 * 1000;

class Request {
  // axios 实例
  instance: AxiosInstance;
  clsLoading: loading;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors;

  constructor(config: RequestConfig) {
    const baseConfig = {
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: TIME_OUT,
      xsrfCookieName: "csrftoken", // 防止xxs攻击
      xsrfHeaderName: "X-CSRFToken", // 防止xxs攻击
      ...config,
    };
    this.clsLoading = new loading(TIME_OUT);
    this.instance = axios.create(baseConfig);
    this.interceptorsObj = config.interceptors;

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log("全局请求拦截器");
        let token = getToken();
        if (token !== null && token !== "")
          config.headers!["Authorization"] = token;
        return config;
      },
      (error: any) => {
        console.log("请求出错，" + error);
        Promise.reject(error);
      }
    );

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (result: AxiosResponse) => {
        console.log("全局响应拦截器");
        if (result.data != null) {
          const res = result.data;
          if (res.code !== undefined && res.msg !== undefined) {
            //result.data.code为错误代码
            if (result.status !== 200 || res.code !== 200 || !res.success) {
              const code: ResultEnum = res.code;
              const msg = res.msg || "请联系管理员解决";
              showCodeMsg(code, msg);
              // return Promise.reject(msg);
            }
            return result.data;
          }
        }
        return getErrResultData(result.status, "非系统服务器返回数据格式");
      },
      (error: any) => {
        let msg; //错误信息
        let status = error.response?.status; //错误状态

        if (error.response?.data?.code === undefined)
          console.log("response err:\n" + JSON.stringify(error.response));

        if (error.response) {
          const res = error.response.data;
          if (res.code !== undefined && res.msg !== undefined) {
            msg = res.msg || "请联系管理员解决"; // 获取错误信息
            showCodeMsg(status, msg);
          } else {
            if (status == "404") {
              showCodeMsg(404, "请求不存在<br/>" + error.response.config.url);
            } else if (String(error.response.data).includes("ECONNREFUSED"))
              showMsg("数据服务器离线，请联系管理员");
            else showMsg("未知异常，请联系管理员");
          }
        } else if (error.message.includes("timeout")) {
          showMsg("请求超时，请检查网络连接!");
        } else {
          showMsg(error.message, 30, "未知异常");
        }
        // 下面会在控制台显示“Uncaught (in promise) Error: Request failed with status code XXX"
        // 错误信息以显示，再抛出异常无意义
        // return Promise.reject(error.response.data)
        return getErrResultData(status, "非系统服务器返回数据格式");
      }
    );
  }

  request(config: RequestConfig, userConfig: Indexable = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      // 开启loading状态
      userConfig.loading && this.clsLoading.openLoading();
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      this.instance
        .request<any>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        })
        .finally(() => {
          // 关闭loading状态
          userConfig.loading && this.clsLoading.closeLoading();
        });
    });
  }
}

function request(config: RequestConfig) {
  const httpServer = new Request(config);
  return httpServer.request(config);
}

function requestGet(config: RequestConfig, userConfig: Indexable = {}) {
  config.headers = config.headers ? config.headers : {};
  config.method = config.method ? config.method : "GET";
  if (config.params) {
    const params = deepClone(config.params);
    Object.keys(params).forEach((item) => {
      if (params[item] === null) {
        delete params[item];
      }
    });
  }
  const httpServer = new Request(config);
  return httpServer.request(config, userConfig);
}

function requestPost(config: RequestConfig, userConfig: Indexable = {}) {
  config.headers = config.headers ? config.headers : {};
  config.method = config.method ? config.method : "POST";
  config.data = config.data ? config.data : {};
  const httpServer = new Request(config);
  return httpServer.request(config, userConfig);
}

export { request, requestGet, requestPost };
