import layoutaside from './home/layout-aside.vue'
import layoutheader from './home/layout-header.vue'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutaside)
    Vue.component('layout-header', layoutheader)
  }
}
