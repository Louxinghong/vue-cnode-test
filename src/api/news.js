import axios from '@/utils/axios.js'

export function getNews (params) {
  return axios.get('https://cnodejs.org/api/v1/topics', { params })
}

// export function newsContent () {
//   return fetch('https://cnodejs.org/api/v1/topics').then(res => res.json())
// }
