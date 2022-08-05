// index.ts
import axios, { AxiosResponse } from "axios";
import { getToken, delToken } from "../commonJs/authority"
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { RequestConfig, RequestInterceptors } from "./types";

class Request {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors;

  constructor(config: RequestConfig) {
    const baseConfig = {
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      ...config,
    };
    this.instance = axios.create(baseConfig);
    this.interceptorsObj = config.interceptors;

    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log("全局请求拦截器");
        return res;
      },
      (err: any) => err
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
      (res: AxiosResponse) => {
        console.log("全局响应拦截器");
        return res.data;
      },
      (err: any) => err
    );
  }

  request(config: RequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
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
        });
    });
  }
}

function request(config: RequestConfig) {
  return new Request(config);
}

export default request;
