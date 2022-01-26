/**
 * 组件注册
 */
// import TagsView from './TagsView'
// import PageTools from './PageTools'
// import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
// import UploadExcel from './UploadExcel'
import VueQuillEditor from 'vue-quill-editor'
// import ScreenFull from './ScreenFull'
// import ThemePicker from './ThemePicker'
// import LangSelect from './LangSelect''
const importFn = require.context('./', true, /\.vue$/)

export default {
  install(Vue) {
    // Vue.component('TagsView', TagsView)
    // Vue.component('PageTools', PageTools)
    // Vue.component('ImageUpload', ImageUpload)
    Vue.use(Print)
    // Vue.component('UploadExcel', UploadExcel)
    Vue.use(VueQuillEditor)
    // Vue.component('ScreenFull', ScreenFull)
    // Vue.component('ThemePicker', ThemePicker)
    // Vue.component('LangSelect', LangSelect)

    // 批量注册全局组件
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      Vue.component(component.name, component)
    })
  }
}