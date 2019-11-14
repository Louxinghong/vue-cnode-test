import Vue from 'vue'

export const state = Vue.observable({
  isMobile: false
})

export function judgeIsMobile (data) {
  const MIN_WIDTH = 600

  if (data.width < MIN_WIDTH) {
    state.isMobile = true
  } else {
    state.isMobile = false
  }

  console.log(state.isMobile)
}
