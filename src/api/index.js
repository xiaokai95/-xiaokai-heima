import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'

import JSONBIG from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求拦截器
axios.interceptors.request.use(config => {
  // 获取token
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})
// 转换数据
axios.defaults.transformResponse = [(data) => {
  // 后台的原始数据   理想情况 json字符串
  // 后台可能没有任何响应内容  data 值是 null
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

// 响应拦截器
axios.interceptors.response.use(res => res,
  err => {
    if (err.response.status === 401) {
      //   window.location.href = 'http://localhost:8080/#/login'
      //   window.location.hash = '#/login'
      return router.push('/login')
    }
  }
)
export default axios
