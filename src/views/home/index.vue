<template>
  <div class="container">
    <p v-if="isLoading" class="loading">Posts is loading...</p>
    <template v-else>
      <div class="topbar" :class="{ open: pageOffset > 120 }">
        <div class="topbar-content">
          <h3>User LGG is coming now</h3>
          <span class="count">{{numbers}} items</span>
        </div>
      </div>
      <h3>User LGG is coming now</h3>
      <span class="count">{{numbers}} items</span>
      <div class="new-items" v-for="(item, index) in posts" :key="index">
        <h3>{{item.title}}</h3>
        <p>{{item.body}}</p>
      </div>
    </template>
  </div>
</template>

<script>
import {
  value,
  watch,
  computed,
  onMounted,
  onUnmounted
} from 'vue-function-api'

function useScroll () {
  const pageOffset = value(0)
  const update = () => {
    pageOffset.value = window.pageYOffset
  }

  onMounted(() => window.addEventListener('scroll', update))
  onUnmounted(() => window.removeEventListener('scroll', update))

  return { pageOffset }
}

function useNewsContent (props) {
  const isLoading = value(false)
  const posts = value([])

  watch(
    (isLoading.value = true),
    this.$axios
      .get('https://cnodejs.org/api/v1/topics')
      .then(data => {
        posts.value = data.data.data
        isLoading.value = false
      })
      .catch(error => {
        console.log(error)
        isLoading.value = false
      })
  )

  return { isLoading, posts }
}

export default {
  name: 'Home',
  setup (props) {
    const { isLoading, posts } = useNewsContent(props)
    const numbers = computed(() => posts.length)

    return {
      ...useScroll(),
      isLoading,
      posts,
      numbers
    }
  }
}
</script>
