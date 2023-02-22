/*
 * @Author: Jian Weng
 * @Date: 2023-02-22 14:55:00
 * @LastEditTime: 2021-08-12 13:37:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vite-vue3\src\commonJs\global.ts
 */

import mitt from "mitt";

/**
 * vue全局事件注册/监听
 */
const event = mitt();

const eventKey = {
  /** 视窗变化触发 */
  ONRESIZE: "onresize",
  ONLOAD: "onload",
  /** 子iframe被点击触发 */
  IFRAME_CLICK: "iframe_click",
  /** 子iframe渲染完成后触发，用于获取子iframe的高度，调整父框容器高度 */
  ON_IFRAME_HEIGTH: "on_iframe_heigth",
  // 证书弹窗弹出
  LICENSE_OPEN: "license_open",
  // 账号密码修改弹窗
  SETTING_OPEN: "setting_open",
  // 外框等待加载
  LOADING_VISIBLE: "loading_visible",
};

export { event, eventKey };
