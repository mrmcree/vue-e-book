import axios from "axios";
import { Indicator, Toast } from "mint-ui";
const baseURL = "http://118.25.23.201:8000/";
export default ({ method = "get", url, params }) => {
  let httpDefault = {
    method,
    url,
    baseURL,
    params: method === "get" || method === "delect" ? params : null,
    data: method === "post" || method === "put" ? JSON.stringify(params) : null,
    timeout: 10000
  };
  Indicator.open({
    text: "加载中...",
    spinnerType: "fading-circle"
  });
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      // 此处的.then属于axios
      .then(res => {
        resolve(res);
        Indicator.close();
      })
      .catch(response => {
        Indicator.close();
        reject(response);
        Toast("请求出错");
      });
  });
};
