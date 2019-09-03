import layoutaside from './home/layout-aside.vue'
import layoutheader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutaside)
    Vue.component('layout-header', layoutheader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
