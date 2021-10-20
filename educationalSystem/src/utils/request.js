/**
 * 创建一个axios拦截器
 */
import axios from 'axios'
import { Message } from 'element-ui'
// 创建一个axios实例
const service = axios.create({
    // 设计axios请求的基础的基础地址
    baseURL: process.env.VUE_APP_BASE_API,
    // 定义超时时间
    timeout: 5000
})
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(response => {
    // axios默认加了一层data
    const { status, msg, data } = response.data;
    if (status == 200) {
        return data
    } else {
        // 业务已经错误
        Message.error(msg);
        return Promise.reject(new Error(msg))
    }
}, error => {
    // 提示错误信息
    Message.error(error.message);
    // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
    return Promise.reject(error)
}
);
// 导出
export default service