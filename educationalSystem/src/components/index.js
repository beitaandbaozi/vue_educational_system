/**
 * 组件注册
 */
import TagsView from './TagsView'
import PageTools from './PageTools'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import UploadExcel from './UploadExcel'
import VueQuillEditor from 'vue-quill-editor'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import LangSelect from './LangSelect'
export default {
    install(Vue) {
        Vue.component('TagsView', TagsView)
        Vue.component('PageTools', PageTools)
        Vue.component('ImageUpload', ImageUpload)
        Vue.use(Print)
        Vue.component('UploadExcel', UploadExcel)
        Vue.use(VueQuillEditor)
        Vue.component('ScreenFull', ScreenFull)
        Vue.component('ThemePicker', ThemePicker)
        Vue.component('LangSelect', LangSelect)
    }
}