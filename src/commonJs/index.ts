/**
 * @description 转化为rgb
 * @param {String} color 16进制颜色值
 * @param {Number} opacity 透明度
 * @return {String} color 返回rgba颜色
 */
const colorToRgb = (color: string, opacity: number): string => {
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

/**
 * @description 深拷贝
 * @param {Object} obj 源数据
 * @param {Array} notClone 不拷贝的内容
 */
const deepClone = (
  obj: { [key: string]: any },
  notClone: Array<string> = []
) => {
  let result: { [key: string]: any } =
    typeof obj.splice === "function" ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === "object" && !notClone.includes(key)) {
        result[key] = deepClone(obj[key]); //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
      } else {
        result[key] = obj[key]; //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
      }
    }
    return result;
  }
  return obj;
};

export {
  // colorObj,
  // getSeriesColor,
  // getThemeColor,
  colorToRgb,
  deepClone
};
