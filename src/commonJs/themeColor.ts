interface ColorObj {
  [key: string]: Indexable;
}

export const colorObj: ColorObj = {
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
