<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, reactive, getCurrentInstance } from 'vue';
//这是绘制图表的参数定义
// const data2 = reactive(
//   [
//     {
//       name: "马云",
//       color: "#2B4A4D",

//       children: [
//         {
//           //子集
//           name: "北京国风信通科技有限公司1",

//           percent: "80%",
//           level: 1,

//           children: [
//             {
//               //子集
//               name: "北京国风信通科技有限公司2",
//               percent: "60%",
//               children: [
//                 {
//                   //子集
//                   name: "北京国风信通科技有限公司3",

//                   percent: "60%",

//                   children: [
//                     {
//                       //子集
//                       name: "北京国风信通科技有限公司4",

//                       percent: "60%",

//                       children: [
//                         {
//                           //子集
//                           name: "北京国风信通科技有限公司5",
//                           value: "控股",
//                           percent: "60%",
//                         },
//                         {
//                           //子集
//                           name: "北京国风信通科技有限公司",
//                           value: "控股",
//                           percent: "60%",

//                           children: [
//                             {
//                               //子集
//                               name: "北京国风信通科技有限公司",
//                               value: "控股",
//                               percent: "60%",
//                             },
//                             {
//                               //子集
//                               name: "北京国风信通科技有限公司",
//                               value: "控股",
//                               percent: "60%",
//                             },
//                           ],
//                         },
//                         {
//                           //子集
//                           name: "北京国风信通科技有限公司",
//                           value: "控股",
//                           percent: "60%",
//                         },
//                       ],
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               name: "test",
//             },
//           ],
//         },
//       ],
//     },
//   ]
// )
const data2 = reactive(
  [
    {
      name: "马云",
      color: "#2B4A4D",


      children: [
        {
          //子集a
          name: "北京国风信通公司2",
          percent: "60%",
        },
        {
          name: "test",
          percent: "40%",
        },
        {
          name: "test",
          percent: "40%",
        },
        {
          name: "test",
          percent: "40%",
        },
      ],
    },
  ],
)

var option = reactive({
  backgroundColor: "#fff",
  toolbox: {
    right: '20px',
    feature: {
      // dataView: { show: true, readOnly: true, title: '图表数据' },
      // magicType: { show: true, type: ['line', 'bar'] },
      // restore: { show: true },
      saveAsImage: { show: true, name: '公司结构图', title: '下载' },
      myEnlarge: {
        show: true,
        title: '放大',
        icon: '下载',
        readOnly: true,
        onclick: function () {
          alert('myToolHandler1')
        }
      },
      // mySave: {
      //   show: true,
      //   title: '下载图片',
      //   icon: '下载',
      //   onclick: function () {
      //     alert('myToolHandler1')
      //   }
      // }
    }
  },
  series: [
    {
      type: "tree",
      zoom: 1,
      name: "",
      edgeShape: "polyline", //链接线是折现还是曲线
      orient: "BT",
      data: data2,
      // width: 600,
      height: 150,
      top: "20%",
      left: "10%",
      symbolSize: 1,
      initialTreeDepth: 10,
      roam: true,
      label: {
        normal: {
          position: [-120, 10],
          verticalAlign: "middle",
          align: "left",
          backgroundColor: "skyblue",
          color: "#fff",
          width: 200,
          height: 40,
          borderWidth: 1,
          borderColor: " skyblue",
          fontWeight: "bold",
          formatter: function (params: any) {
            console.log(params.data);
            if (params.data.percent) {
              return [
                `{box|${params.data.name}}`,
                `{percent| 持股数：${params.data.percent}}`,
              ].join("\n");
            } else {
              return [`{box|${params.data.name}}`].join("\n");
            }
          },
          rich: {
            box: {
              height: 40,
              color: "#D3D3D4",
              padding: [0, 5],
              align: "center",
              fontWeight: "bold",
              fontSize: 12,
              fontFamily: "PingFangSC-Light",
            },
            percent: {
              padding: [0, 0, 0, 0],
              width: 100,
              height: 18,
              color: "#43A1AC",
              verticalAlign: "middle",
              fontSize: 12,
              borderWidth: 0,
              fontWeight: "normal",
            },
          },
        },
      },
      leaves: {
        label: {
          normal: {
            backgroundColor: "skyblue",
            verticalAlign: "middle",
            align: "left",
            // width: 100,
            // height: 30,
            padding: [10, 0, 0, 0],
            // lineHeight: 80,
            fontSize: 12,
            fontWeight: "normal",
            // width: 200,
            borderColor: " skyblue",
            borderWidth: 1,
            formatter: function (param: any) {
              let percent = param.data.percent;
              let name = param.name;
              if (percent) {
                return [`{name|${name}}`, `{percent|持股数：${percent}}`].join("\n");
              }
              return `{name|${name}}`
            },
            rich: {
              percent: {
                // height: 18,
                color: "#43A1AC",
                
                align: "center",
                verticalAlign: "middle",
                fontSize: 12,
                borderWidth: 0,
                fontWeight: "normal",
              },
              name: {
                // height: 36,
                color: "#D3D3D4",

                align: "center",
                fontWeight: "bold",
                fontSize: 12,
                fontFamily: "PingFangSC-Light",
              },
            },
          },
        },
      },
      lineStyle: {
        color: "#ccc",
      },
      expandAndCollapse: false,
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
})
let mychart: any = reactive({})
const mapFuncton = (el: HTMLElement) => {
  mychart = echarts.init(el)
  mychart.setOption(option);
  window.addEventListener("resize", echarts.resize);
}
onMounted(() => {
  const chartsBox: any = getCurrentInstance()
  console.log(chartsBox)
  if (chartsBox.refs) {
    mapFuncton(chartsBox.refs.treeCharts) //初始化地图
  }
})
</script>

<template>
  <div class="treeCharts">
    <div id="treeCharts" ref="treeCharts"></div>
  </div>
</template>

<style scoped lang="scss">
.treeCharts {
  // height: 100%;
  width: 100%;
  height: 300px;

  #treeCharts {
    height: 100%;
    /*width: 97%;*/
    /*height: 99%;*/
  }
}
</style>