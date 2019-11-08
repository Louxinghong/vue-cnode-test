import axios from '@/utils/axios.js'

/**
 * 获取个人详情信息
 * @param {string} loginname 个人编号
 */
export function getUserDetail (loginname) {
  return axios.get(`https://cnodejs.org/api/v1/user/${loginname}`)
}

/**
 * 获取个人所收藏的主题
 * @param {string} loginname 个人编号
 */
export function getUserCollection (loginname) {
  return axios.get(`https://cnodejs.org/api/v1/topic_collect/${loginname}`)
}
