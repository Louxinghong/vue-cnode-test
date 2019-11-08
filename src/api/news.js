import axios from '@/utils/axios.js'

/**
 * 获取论坛信息列表内容
 * @param {object} params 查询条件
 */
export function getNews (params) {
  return axios.get('https://cnodejs.org/api/v1/topics', { params })
}

/**
 * 获取文章详情
 * @param {string} topicId 文章编号
 */
export function getNewsDetail (topicId) {
  return axios.get(`https://cnodejs.org/api/v1/topic/${topicId}`)
}

// export function newsContent () {
//   return fetch('https://cnodejs.org/api/v1/topics').then(res => res.json())
// }
