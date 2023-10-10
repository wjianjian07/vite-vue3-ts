<script setup lang="ts">
import { ThemeEnum } from "@/enums/appEnum";
import { customLoadMicroApp, getSystemItemList } from "@/qiankun/qiankunContainer";
import { beforeLoad, afterMount } from "@/qiankun/qiankunPageLoad";
import { requestGet } from "@/server"
import { QiankunConfig } from "@/server/qiankunConfig";
import { ClickOutside as vClickOutside } from 'element-plus'
import { registerMicroApps, runAfterFirstMounted, start } from "qiankun";
import { judgeSettingOpen } from "utils/common";
import { event, eventKey } from "utils/global";
import { useUserStoreWithOut } from "@/store/modules/user"
import { useQiankunStoreWithOut } from "@/store/modules/qiankun";
import api from '@/Api'

defineProps({
  msg: String,
});
const userStore = useUserStoreWithOut()
const qiankunStore = useQiankunStoreWithOut()
let skinIndex = ref(0)
let dialogTimes = ref(0)
let isSetting = ref(false)
let showCascader = ref(false)
const cascaderPanel = ref<HTMLElement>()
const userDialog = ref<HTMLElement>(qiankunStore.shareComponents['centerUserDialog'])
const options = reactive(
  [{
    value: 'zhinan',
    label: '指南',
    children: [{
      value: 'shejiyuanze',
      label: '设计原则',
      children: [{
        value: 'yizhi',
        label: '一致'
      }, {
        value: 'fankui',
        label: '反馈'
      }, {
        value: 'xiaolv',
        label: '效率'
      }, {
        value: 'kekong',
        label: '可控'
      }]
    }, {
      value: 'daohang',
      label: '导航',
      children: [{
        value: 'cexiangdaohang',
        label: '侧向导航'
      }, {
        value: 'dingbudaohang',
        label: '顶部导航'
      }]
    }]
  }, {
    value: 'zujian',
    label: '组件',
    children: [{
      value: 'basic',
      label: 'Basic',
      children: [{
        value: 'layout',
        label: 'Layout 布局'
      }, {
        value: 'color',
        label: 'Color 色彩'
      }, {
        value: 'typography',
        label: 'Typography 字体'
      }, {
        value: 'icon',
        label: 'Icon 图标'
      }, {
        value: 'button',
        label: 'Button 按钮'
      }]
    }, {
      value: 'form',
      label: 'Form',
      children: [{
        value: 'radio',
        label: 'Radio 单选框'
      }, {
        value: 'checkbox',
        label: 'Checkbox 多选框'
      }, {
        value: 'input',
        label: 'Input 输入框'
      }, {
        value: 'input-number',
        label: 'InputNumber 计数器'
      }, {
        value: 'select',
        label: 'Select 选择器'
      }, {
        value: 'cascader',
        label: 'Cascader 级联选择器'
      }, {
        value: 'switch',
        label: 'Switch 开关'
      }, {
        value: 'slider',
        label: 'Slider 滑块'
      }, {
        value: 'time-picker',
        label: 'TimePicker 时间选择器'
      }, {
        value: 'date-picker',
        label: 'DatePicker 日期选择器'
      }, {
        value: 'datetime-picker',
        label: 'DateTimePicker 日期时间选择器'
      }, {
        value: 'upload',
        label: 'Upload 上传'
      }, {
        value: 'rate',
        label: 'Rate 评分'
      }, {
        value: 'form',
        label: 'Form 表单'
      }]
    }, {
      value: 'data',
      label: 'Data',
      children: [{
        value: 'table',
        label: 'Table 表格'
      }, {
        value: 'tag',
        label: 'Tag 标签'
      }, {
        value: 'progress',
        label: 'Progress 进度条'
      }, {
        value: 'tree',
        label: 'Tree 树形控件'
      }, {
        value: 'pagination',
        label: 'Pagination 分页'
      }, {
        value: 'badge',
        label: 'Badge 标记'
      }]
    }, {
      value: 'notice',
      label: 'Notice',
      children: [{
        value: 'alert',
        label: 'Alert 警告'
      }, {
        value: 'loading',
        label: 'Loading 加载'
      }, {
        value: 'message',
        label: 'Message 消息提示'
      }, {
        value: 'message-box',
        label: 'MessageBox 弹框'
      }, {
        value: 'notification',
        label: 'Notification 通知'
      }]
    }, {
      value: 'navigation',
      label: 'Navigation',
      children: [{
        value: 'menu',
        label: 'NavMenu 导航菜单'
      }, {
        value: 'tabs',
        label: 'Tabs 标签页'
      }, {
        value: 'breadcrumb',
        label: 'Breadcrumb 面包屑'
      }, {
        value: 'dropdown',
        label: 'Dropdown 下拉菜单'
      }, {
        value: 'steps',
        label: 'Steps 步骤条'
      }]
    }, {
      value: 'others',
      label: 'Others',
      children: [{
        value: 'dialog',
        label: 'Dialog 对话框'
      }, {
        value: 'tooltip',
        label: 'Tooltip 文字提示'
      }, {
        value: 'popover',
        label: 'Popover 弹出框'
      }, {
        value: 'card',
        label: 'Card 卡片'
      }, {
        value: 'carousel',
        label: 'Carousel 走马灯'
      }, {
        value: 'collapse',
        label: 'Collapse 折叠面板'
      }]
    }]
  }, {
    value: 'ziyuan',
    label: '资源',
    children: [{
      value: 'axure',
      label: 'Axure Components'
    }, {
      value: 'sketch',
      label: 'Sketch Templates'
    }, {
      value: 'jiaohu',
      label: '组件交互文档'
    }]
  }]
)

onBeforeMount(() => {
  event.off(eventKey.SETTING_OPEN);
  event.on(eventKey.SETTING_OPEN, accountSetting);
})
onMounted(async () => {
  requestGet({ url: api.home.a, params: {aa: '你好啊'} },).then((res: any) => {
    console.log(res, 'ertgergerger')
  })
  if (!window.qiankunStarted && QiankunConfig.qiankunOpen) {
    const list = await getSystemItemList();
    // 注册子应用
    registerMicroApps(list, {
      beforeLoad,
      afterMount,
    });

    window.qiankunStarted = true;
    start({
      prefetch: false,
      // strictStyleIsolation: true,
      singular: false,
      sandbox: false,
    });
  }
  runAfterFirstMounted(() => {
    judgeSettingOpen();
  })
})
// 账号设置
const accountSetting = () => {
  isSetting.value = false;
  dialogTimes.value = +new Date();
  nextTick(() => {
    isSetting.value = true;
    nextTick(() => {
      customLoadMicroApp("center", (() => {
        // userDialog.openDialog({
        //   userId: userStore.userInfo!.userId
        // }, 2);
      }));
    })
  })
}

const setSkin = (index: number, e: ThemeEnum) => {
  // let personalConfigs=[...this.skinTheme];
  // if(personalConfigs.length==0){
  //   personalConfigs.push({
  //     confValue:null,
  //     confDesc: "当前主题",
  //     confKey: "skinTheme"
  //   })
  // }
  // personalConfigs[0].confValue=e;
  // personalConfigs.forEach(item => {
  //   delete item['userId'];
  //   delete item['confGroup'];
  // });
  // http.bdaAxios({
  //   url:interAPI.personalConfig.saveByGroup,
  //   method:"post",
  //   data:{
  //     group: "skin",
  //     personalConfigs:personalConfigs
  //   }
  // }).then(res=>{
  //   window.document.documentElement.setAttribute( "data-theme", e );
  //   this.$store.commit(globalMutationType.getKey(globalMutationType.CM_SKIN_THEME), personalConfigs);
  //   changeSkin();
  // })
  skinIndex.value = index;
  window.document.documentElement.setAttribute("data-theme", e);
}
const onClickOutside = () => {
  showCascader.value = false
  console.log(document.querySelector('.el-cascader-panel'), 'cascaderPanel')
}

</script>

<template>
  <div class="home">
    <div class="setting-skin">
      <span class="setting-skin-title">切换主题</span>
      <div class="right-toggle">
        <i style="visibility: hidden" class="iconfont icon-bda-back-old backBtn el-tooltip"></i>
        <div v-bind:class="{ 'skin-item': true, 'skin-item-active': skinIndex == 0 }"
          v-on:click="setSkin(0, ThemeEnum.BLUE)">
          <span class="skin skin-white"></span>
        </div>
        <div v-bind:class="{ 'skin-item': true, 'skin-item-active': skinIndex == 1 }"
          v-on:click="setSkin(1, ThemeEnum.GREEN)">
          <span class="skin skin-green"></span>
        </div>
        <div v-bind:class="{ 'skin-item': true, 'skin-item-active': skinIndex == 2 }"
          v-on:click="setSkin(2, ThemeEnum.GRAY)">
          <span class="skin skin-blue"></span>
        </div>
        <div v-bind:class="{ 'skin-item': true, 'skin-item-active': skinIndex == 3 }"
          v-on:click="setSkin(3, ThemeEnum.OABLUE)">
          <span class="skin skin-oablue"></span>
        </div>
      </div>
    </div>
    <div class="box" v-click-outside="onClickOutside">
      <el-button @click="showCascader = true">你好</el-button>
      <el-cascader-panel v-show="showCascader" ref="cascaderPanel" :options="options"></el-cascader-panel>
    </div>
    <!-- 账号设置 -->
    <div v-if="isSetting" :key="dialogTimes">
      <component ref="userDialog" v-if="userDialog" :is="userDialog"></component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './../../assets/skin/handle.scss';

.box {
  position: relative;
  // .el-button {
  // }

  .el-cascader-panel {
    position: absolute;
    left: 65px;
    top: 0;
  }

}

.home {
  height: 100%;

  .setting-skin {
    background-color: #eee;
    @include background_color("setting_header_background_color");
    height: 34px;
    padding: 8px 20px 10px;
    box-sizing: border-box;
    display: flex;

    .backBtn:hover {
      color: #4298f3;
    }

    .setting-skin-title {
      font-size: 12px;
      // color: grey;
      margin-right: 10px;
    }

    .right-toggle {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

    .backBtn {
      color: #b3b3b3;
      margin-right: 5px;
      cursor: pointer;
    }

    .skin-item {
      position: relative;
      height: 16px;
      width: 16px;
      background: #eee;
      border: 2px solid transparent;
      box-sizing: border-box;
      display: flex;
      border-radius: 50%;
      margin: 0 2px;

      .skin {
        display: inline-block;
        vertical-align: middle;
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: auto;
        cursor: pointer;
      }

      .skin-white {
        background: #fff;
      }

      .skin-green {
        background: #006f6b;
      }

      .skin-blue {
        background: #6a8bad;
      }

      .skin-dark-blue {
        background: #0C0E0F;
      }

      .skin-oablue {
        background: #2794F2;
      }
    }

    .skin-item-active {
      border: 2px solid #4298f3;
      @include border_color('setting_siknItem_active_border_color');
      background: #fff;

      .skin {
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>
