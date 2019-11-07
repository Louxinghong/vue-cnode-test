import axios from 'axios'
import { Message } from 'view-design'

/**
 * Global HTTP Setting
 */
axios.defaults.timeout = 60000
axios.defaults.baseURL = ''

// http Request instance
const httpInstance = axios.create()
// Merge axios to httpInstance,
Object.setPrototypeOf(httpInstance, axios)

// Add a request interceptor
httpInstance.interceptors.request.use(
  config => {
    const defaultData = {}

    if (config.method === 'post') {
      config.data = Object.assign(defaultData, config.data)
    }

    if (config.method === 'get') {
      config.params = Object.assign(defaultData, config.params)
    }
    return config
  },
  e => {
    Message.warning('请求失败, 请稍后再试!')
    return Promise.reject(e)
  }
)

// Add a response interceptor
httpInstance.interceptors.response.use(
  res => {
    return res
  },
  e => {
    const statusCode = e.response.status
    if (statusCode === 404) {
      Message.warning('接口出错!')
    } else {
      Message.warning('请求超时或服务器出错!')
    }
    return Promise.reject(e)
  }
)

export default httpInstance
