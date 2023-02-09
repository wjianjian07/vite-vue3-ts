import { ElLoading } from "element-plus";
// import { clearTimeout, setTimeout } from "timers";

/**
 * 加载层及提示
 */
class Loading {
  time: number;
  timer: any;
  loading: any;
  // clearTimeout: any;
  openLoading: () => void;
  closeLoading: () => void;
  /**
   * 加载持续时间
   * @param {number} time 加载持续时间
   */
  constructor(time = 5000) {
    this.time = time;
    this.timer = null;
    this.loading = null;
    this.openLoading = () => {
      this.loading = ElLoading.service({
        lock: true,
        text: "",
        // spinner: "icon iconfont icon-bda-loading bda-loading",
        // spinner: "el-icon-loading",
        background: "#f0f6fa",
      });
      if (this.timer) {
        this.timer.clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.loading.close();
        this.timer = null;
      }, this.time);
    };
    /**
     * 关闭加载层
     */
    this.closeLoading = () => {
      if (this.loading !== null) {
        this.loading.close();
        clearTimeout(this.timer);
        this.timer = null;
      }
    };
  }
}

export default Loading;
