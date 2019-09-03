import axios from 'axios'
import router from '../permission'
import jsonbigint from 'json-bigint'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.defaults.transformResponse = [function (data) {
  return jsonbigint.parse(data)
}]
axios.interceptors.request.use((config) => {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, () => {})
axios.interceptors.response.use((response) => {
  return response.data ? response.data : {}
}, (err) => {
  //   console.log(err)
  let status = err.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户，无权限登录'
      break
    case 507:
      message = '服务器或数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    case 401:
      window.localStorage.clear() // 因为token有可能过期 清除垃圾token
      router.push('/login')
      break
    default:
      message = '未知错误'
      break
  }
  Message({
    type: 'warning',
    message
  })
  return new Promise(function () {})
})

export default axios
