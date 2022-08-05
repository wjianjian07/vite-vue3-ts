module.exports = {
  plugins: {
    'autoprefixer': {
      'overrideBrowserslist': [
        'ie >= 8',   //兼容ie7以上浏览器
        'Firefox >= 3.5', //兼容火狐版本号大于3.5浏览器
        'chrome >= 35',   //兼容chrome版本号大于35浏览器
        'opera >= 11.5',   //兼容opera版本号大于11.5浏览器
        'Android >= 4.0',
        'iOS >= 8',
      ]
    },
    'tailwindcss': {}
    // 转换像素单位使用（适合移动端、混合app等）
    // 'postcss-pxtorem': { 
    // rootValue: 75, //设置根元素大小, 值为移动端页面值/10
    // propList: ['*'], //所有属性都可以从px更改的rem的属性
    // exclude: /node_modules/i, //排除node_modules目录下所有的文件
    // selectorBlackList: ['vant-','.my-'], //过滤掉vant-开头的元素选择器, .my-开头的类选择器
    // },
  },
};