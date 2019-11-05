export function newsContent () {
  return fetch('https://cnodejs.org/api/v1/topics').then(res => res.json())
}
