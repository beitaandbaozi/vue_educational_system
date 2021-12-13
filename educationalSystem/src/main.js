import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Component from '@/components'
import i18n from '@/lang'

// 定义全局过滤器
Vue.filter('dateFormat', function (value) {
    const time = Number(value);
    const date = new Date(time);
    const y = date.getFullYear(); // 年
    let MM = date.getMonth() + 1; // 月
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate(); // 日
    d = d < 10 ? "0" + d : d;
    let h = date.getHours(); // 时
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes(); // 分
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds(); // 秒
    s = s < 10 ? "0" + s : s;
    return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)  // t方法 会去对应的语言包里寻找对应的内容
})

Vue.use(Component);

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})
