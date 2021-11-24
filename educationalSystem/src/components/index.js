/**
 * 组件注册
 */
import TagsView from './TagsView'
import PageTools from './PageTools'
import ImageUpload from './ImageUpload'
export default {
    install(Vue) {
        Vue.component('TagsView',TagsView)
        Vue.component('PageTools',PageTools)
        Vue.component('ImageUpload',ImageUpload)
    }
}