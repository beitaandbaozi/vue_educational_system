/**
 * 组件注册
 */
import TagsView from './TagsView'
import PageTools from './PageTools'
export default {
    install(Vue) {
        Vue.component('TagsView',TagsView)
        Vue.component('PageTools',PageTools)
    }
}