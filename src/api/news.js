import axios from '@/utils/axios.js'

export const getNews = () => {
  return axios.get('https://cnodejs.org/api/v1/topics')
}

// export function newsContent () {
//   return fetch('https://cnodejs.org/api/v1/topics').then(res => res.json())
// }
