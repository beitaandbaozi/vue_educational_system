/**
 * 创建一个axios拦截器
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 定义超时时间
// 创建一个axios实例
const service = axios.create({
    // 设计axios请求的基础的基础地址   跨域处理
    baseURL: process.env.VUE_APP_BASE_API,
    // 定义超时时间
    timeout: 100000
})
// 请求拦截器
service.interceptors.request.use(config => {
    // 在这个位置统一注入token
    if (store.getters.token) {
        // 只有在有token的情况下 才有必要去检查时间戳是否超时
        if (IsCheckTimeOut()) {
            // 如果它为true表示 过期了
            // token没用了 因为超时了
            store.dispatch('user/logout') // 登出操作
            // 跳转到登录页
            router.push('/login')
            return Promise.reject(new Error('token超时了'))
        }
        // 如果存在token 注入token
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})
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
    // error 信息 里面 response的对象
    if (error.response && error.response.data && error.response.data.code === 10002) {
        // 当等于10002的时候 表示 后端告诉我token超时了
        store.dispatch('user/logout') // 登出action 删除token
        router.push('/login')
    } else {
        Message.error(error.message) // 提示错误信息
    }
    // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
    return Promise.reject(error)
}
);
// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
    var currentTime = Date.now() // 当前时间戳
    var timeStamp = getTimeStamp() // 缓存时间戳
    return (currentTime - timeStamp) / 1000 > TimeOut
}
// 导出
export default service