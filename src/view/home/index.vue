<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { requestGet } from "@/server"

defineProps({
  msg: String,
});
let skinIndex = ref(0)
onMounted(() => {
  requestGet({ url: 'asdasd?a=你好啊' }).then((res: any) => {
    console.log(res, 'ertgergerger')
  })
})
const setSkin = (index: number, e: string) => {
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
</script>

<template>
  <div class="home">
    <div class="setting-skin">
      <span class="setting-skin-title">切换主题</span>
      <div class="right-toggle">
        <i style="visibility: hidden" class="iconfont icon-bda-back-old backBtn el-tooltip"></i>
        <div v-bind:class="{ 'skin-item': true, 'skin-item-active': skinIndex == 0 }" v-on:click="setSkin(0, 'blue')">
          <span class="skin skin-white"></span>
        </div>
        <div v-bind:class="{ 'skin-item': true, 'skin-item-active': skinIndex == 1 }" v-on:click="setSkin(1, 'green')">
          <span class="skin skin-green"></span>
        </div>
        <div v-bind:class="{ 'skin-item': true, 'skin-item-active': skinIndex == 2 }" v-on:click="setSkin(2, 'gray')">
          <span class="skin skin-blue"></span>
        </div>
      </div>
      <span class="text-value">123132131</span>
    </div>
  </div>

</template>

<style lang="scss" scoped>
@import './../../assets/skin/handle.scss';

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
        background: #1177e2;
      }

      .skin-dark-blue {
        background: #0C0E0F;
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
