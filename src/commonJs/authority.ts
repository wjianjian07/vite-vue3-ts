// const Cookies = require("js-cookie");
import Cookies from "js-cookie";
// cookie保存的天数

const TOKEN_KEY = "TOKEN_KEY";

const setToken = (token: string, cookieExpires: number | Date) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 });
};

const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  else return false;
};

const delToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export { TOKEN_KEY, setToken, getToken, delToken };
