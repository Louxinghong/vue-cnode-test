<template>
  <div class="dashboard">
    <Button type="primary">嗯呐</Button>
    <div class="item" v-for="(item, index) in posts" :key="index">
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import { value, watch } from 'vue-function-api'
import { getNews } from '@/api/news.js'

function useNewsContent (props) {
  const isLoading = value(false)
  const posts = value([])

  watch(
    () => props.id,
    async id => {
      isLoading.value = true
      const news = await getNews()
      posts.value = news.data.slice(0, 25)
      isLoading.value = false
    }
  )

  return { isLoading, posts }
}

export default {
  name: 'Dashboard',
  setup (props) {
    const { isLoading, posts } = useNewsContent(props)
    console.log(posts)

    return {
      isLoading,
      posts
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  height: 100%;
  width: 100%;

  .item {
    width: 100%;
    height: 50px;

    &:not(:last-child) {
      border-bottom: 1px solid black;
    }
  }
}
</style>
