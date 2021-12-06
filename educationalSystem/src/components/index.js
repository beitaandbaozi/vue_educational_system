/**
 * 组件注册
 */
import TagsView from './TagsView'
import PageTools from './PageTools'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import UploadExcel from './UploadExcel'
import wangEnduit from './wangEnduit'
export default {
    install(Vue) {
        Vue.component('TagsView', TagsView)
        Vue.component('PageTools', PageTools)
        Vue.component('ImageUpload', ImageUpload)
        Vue.use(Print)
        Vue.component('UploadExcel', UploadExcel)
        Vue.component('wangEnduit', wangEnduit)
    }
}