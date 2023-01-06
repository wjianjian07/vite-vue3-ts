// index.ts
import axios, { AxiosResponse } from "axios";
import { getToken, delToken } from "../commonJs/authority";
import router from "../router";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { RequestConfig, RequestInterceptors } from "./types";

import { ElMessage, ElMessageBox } from "element-plus";

const TIME_OUT: number = 10 * 1000;

class Request {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors;

  constructor(config: RequestConfig) {
    const baseConfig = {
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: TIME_OUT,
      ...config,
    };
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
              const code = res.code;
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
        let status = error.response.status; //错误状态

        if (error.response.data.code === undefined)
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

function getErrResultData(code: number, msg: string) {
  return {
    code: code,
    msg: msg,
    success: false,
    data: null,
  };
}

function showCodeMsg(code: number, msg: string) {
  if (code === 401) {
    process401();
    return Promise.reject("无效/过期的会话，请重新登录。");
  } else if (code === 400) {
    showMsg(msg, 30, "客户端错误");
  } else if (code === 403) {
    showMsg(msg || "权限不足");
  } else if (code === 404) {
    showMsg(msg || "请求不存在");
  } else if (code === 500) {
    showMsg(msg, 30, "服务器异常");
  } else if (code === 501) {
    showMsg(msg || "您的操作被取消或不允许提交");
  } else {
    showMsg(msg, 30, "其他异常");
  }
}
/**
 * 显示信
 *
 * @param msg 主信息
 * @param duration 停留时间，秒。不输入或null默认30
 * @param auxMsg 小字号显示的附加信息
 * @param data 携带数据
 */
function showMsg(
  msg: string,
  duration: number = 10,
  auxMsg: string = "",
  data: string = ""
) {
  const hasData = data != null && data !== "";
  const hasAuxMsg = auxMsg != null && auxMsg !== "";
  let message = "<p><strong>" + msg + "</strong></p>";
  if (hasData)
    message +=
      "<br/><p><small>返回数据:" + JSON.stringify(data) + "</small></p>";
  if (hasAuxMsg) message += "<br/><small><i>" + auxMsg + "</i></small>";
  if (duration == null) duration = 30000;
  else duration = duration * 1000;
  ElMessage({
    duration: duration,
    showClose: true,
    message: message,
    grouping: true,
    type: "error",
    dangerouslyUseHTMLString: true,
  });
}

function process401() {
  ElMessageBox.confirm("无效/过期的服务器访问，请重新登录。", "确定登出", {
    confirmButtonText: "重新登录",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    delToken(); //删除token
    router.push("login");

    // logout().then(() => {
    //     location.reload()// 重实例化router
    // })
  });
}

function request(config: RequestConfig) {
  return new Request(config);
}

export default request;
