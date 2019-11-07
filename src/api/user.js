import axios from '@/utils/axios.js'

/**
 * 获取个人详情信息
 * @param {string} loginname 个人id
 */
export function getUserDetail (loginname) {
  return axios.get(`https://cnodejs.org/api/v1/user/${loginname}`)
}
