import layoutaside from './home/layout-aside.vue'
import layoutheader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import coverImages from './publish/cover-images.vue'
import selectImages from './publish/select-images.vue'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutaside)
    Vue.component('layout-header', layoutheader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-images', coverImages)
    Vue.component('select-images', selectImages)
  }
}
