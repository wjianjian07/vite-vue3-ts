import { ElMessage, ElMessageBox } from "element-plus";
import router from "../router";
import { delToken } from "../commonJs/authority";

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
function getErrResultData(code: number, msg: string) {
  return {
    code: code,
    msg: msg,
    success: false,
    data: null,
  };
}

export { showMsg, showCodeMsg, getErrResultData };
