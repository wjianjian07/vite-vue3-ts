// 乾坤系统是否开启 QiankunConfig.qiankunOpen
export const QiankunConfig = {
  qiankunOpen: true,
};

/**
 * 首字母大写
 * @param {string} str
 * @returns string
 */
 export const toUpperCase=(str: string)=>{
  return str.replace(/\b\w+\b/g,function(word){
    return word.substring(0,1).toUpperCase() + word.substring(1);
  });
}