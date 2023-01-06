interface colorObjType<themeColor> {
  light: themeColor;
  dark: themeColor;
  [key: string]: themeColor;
}
interface themeColorType {
  [key: string]: string | number;
}
const colorObj: colorObjType<themeColorType> = {
  // 浅
  light: {
    // 主要文字
    main_text_color: "#333333",
    // 常规文字
    default_text_color: "#666666",
    // 次要文字
    sub_text_color: "#898989",
    // 占位文字
    placeholder_text_color: "#c2c2c2",
    // 禁用文字
    disabled_text_color: "#a8a8a8",
    // 粗细
    default_font_weight: 400,
    // 常规盒子外边框
    default_border_color: "#e6e6e6",
    // 主面板内填充
    main_panel_background_color: "#ffffff",
    // 常规面板内填充
    default_panel_background_color: "#ffffff",
    // 弹窗面板内填充
    dialog_panel_background_color: "#ffffff",
    // 查询面板外边框
    query_panel_outside_border_color: "#e6e6e6",
    // 查询面板内填充
    query_panel_background_color: "#f7f7f7",

    // 提示背景
    tooltip_background_color: "#ffffff",
    // 提示边框
    tooltip_border_color: "#e6e6e6",
    // 提示文本
    tooltip_text_color: "#333333",
    // 提示阴影
    tooltip_box_shadow_val: "0 4px 8px 0",
    tooltip_box_shadow_color: "rgba(0, 0, 0, 0.08)",
  },
  // 深
  dark: {
    // 主要文字
    main_text_color: "#ffffff",
    // 常规文字
    default_text_color: "#ffffff",
    // 次要文字
    sub_text_color: "#a3b4cc",
    // 占位文字
    placeholder_text_color: "#808080",
    // 禁用文字
    disabled_text_color: "#808080",
    // 粗细
    default_font_weight: 700,
    // 常规盒子外边框
    default_border_color: "#3d454d",
    // 主面板内填充
    main_panel_background_color: "#0c0e0f",
    // 常规面板内填充
    default_panel_background_color: "#1f2429",
    // 弹窗面板内填充
    dialog_panel_background_color: "#23282e",
    // 查询面板外边框
    query_panel_outside_border_color: "#3c4147",
    // 查询面板内填充
    query_panel_background_color: "#2d3238",

    // 提示背景
    tooltip_background_color: "#333333",
    // 提示边框
    tooltip_border_color: "#4d4d4d",
    // 提示文本
    tooltip_text_color: "#ffffff",
    // 提示阴影
    tooltip_box_shadow_val: "0 10px 20px 0",
    tooltip_box_shadow_color: "rgba(0, 0, 0, 0.8)",
  },
  // 蓝
  blue: {
    c_color: "#4298f3",
    c_color_light: "#f2f8fe",
  },
  // 深蓝
  darkBlue: {
    c_color: "#4298f3",
    c_color_light: "#294766",
  },
  // oa蓝
  oaBlue: {
    c_color: "#00aaff",
    c_color_light: "#eef9ff",
  },
  // de蓝
  gray: {
    c_color: "#1177e2",
    c_color_light: "#eff6fd",
  },
  // 绿
  green: {
    c_color: "#006f6b",
    c_color_light: "#ddedf2",
  },
};

/**
 * @description 获取系列颜色
 * @param {参数类型} name 对应颜色字段
 * @param {参数类型} opacity 透明度，设置了值会转化成rgba
 * @return {返回值类型} color 返回浅、暗系列颜色
 */
const getSeriesColor = (name: string, opacity: number) => {
  const htmlTheme = window.document.documentElement.getAttribute("data-theme");
  let color: string | number;
  if (htmlTheme?.indexOf("dark") !== -1) {
    color = colorObj["dark"][name];
  } else {
    color = colorObj["light"][name];
  }
  if (opacity !== undefined) {
    color = colorToRgb(color as string, opacity);
  }
  return color;
};

/**
 * @description 获取主题颜色
 * @param {参数类型} name 对应颜色字段
 * @param {参数类型} opacity 透明度，设置了值会转化成rgba
 * @return {返回值类型} color 返回主题颜色
 */
const getThemeColor = (name: string, opacity: number) => {
  const htmlTheme =
    window.document.documentElement.getAttribute("data-theme") ?? "";
  let color: string | number;
  if (colorObj[htmlTheme]) {
    color = colorObj[htmlTheme][name];
  } else {
    color = colorObj["blue"][name];
  }
  if (opacity !== undefined) {
    color = colorToRgb(color as string, opacity);
  }
  return color;
};

/**
 * @description 转化为rgb
 * @param {参数类型} color 16进制颜色值
 * @param {参数类型} opacity 透明度
 * @return {返回值类型} color 返回rgba颜色
 */
const colorToRgb = (color: string, opacity: number) => {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  color = color.toLowerCase();
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return `rgba(${colorChange.join(",")}, ${opacity})`;
  } else {
    return color;
  }
};

export { colorObj, getSeriesColor, getThemeColor, colorToRgb };
