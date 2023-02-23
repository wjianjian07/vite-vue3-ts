import { UserInfo } from "types/store";
import { ElMessage } from "element-plus";
import { useUserStoreWithOut } from "@/store/modules/user";
import { event, eventKey } from "utils/global";

const userStore = useUserStoreWithOut();
/**
 * @description 判断是否弹出账号设置
 */
const judgeSettingOpen = () => {
  return new Promise((resolve, reject) => {
    const currentUser = userStore.userInfo as UserInfo;
    const firstLogin = currentUser.firstLogin == "1";
    const passExpire = currentUser.status == "4";
    if (firstLogin || passExpire) {
      if (firstLogin) {
        ElMessage({
          type: "info",
          message: "为了保障你的账号安全，请先修改密码后再进行操作",
        });
      } else if (passExpire) {
        ElMessage({
          type: "info",
          message: "您的密码已过期，请先修改密码",
        });
      }
      event.emit(eventKey.SETTING_OPEN);
      reject();
    } else {
      resolve("");
    }
  });
};
export { judgeSettingOpen };
