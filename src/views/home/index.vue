<template>
  <div class="container">
    <div v-if="isLoading" class="loading">
      <span>Posts is loading...</span>
    </div>

    <template v-else>
      <div class="topbar" :class="{ open: pageOffset > 120 }">
        <div class="topbar-content">
          <p>User LGG post</p>
          <span class="count">{{numbers}} items</span>
        </div>
      </div>

      <div class="title">
        <p>User LGG post</p>
        <span class="count">{{numbers}} items</span>
      </div>

      <div class="new-item" v-for="(item, index) in posts" :key="index">
        <p>{{item.title}}</p>
        <span>{{item.author.loginname}}</span>
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
import { newsContent } from '@/api/news.js'

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
    () => props.id,
    async id => {
      isLoading.value = true
      const news = await newsContent()
      console.log(news)
      posts.value = news.data
      isLoading.value = false
    }
  )

  return { isLoading, posts }
}

export default {
  name: 'Home',
  setup (props) {
    const { isLoading, posts } = useNewsContent(props)
    const numbers = computed(() => posts.value.length)

    return {
      ...useScroll(),
      isLoading,
      posts,
      numbers
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  margin: 0 auto;
  width: 600px;
  height: 100%;

  .loading {
    position: relative;
    text-align: center;
    top: 50px;
  }

  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: hidden;
    height: 0;
    background: crimson;
    transition: all 0.5s ease-out;
    box-shadow: 0 5px 1px rgba(0, 0, 0, 0.466);
    color: #ffffff;

    &.open {
      height: 60px;
    }

    .topbar-content {
      display: flex;
      height: 60px;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;

      p {
        margin: 0 !important;
        font-size: 23px;
      }
    }
  }

  .title {
    margin-top: 80px;
    text-align: center;
    p {
      margin: 0 !important;
      font-size: 34px;
      font-weight: 600;
    }

    span {
      display: inline-block;
      margin-top: 5px;
      padding: 5px 10px;
      background: crimson;
      color: #ffffff;
      border-radius: 50px;
    }
  }

  .new-item {
    width: 100%;
    height: 120px;
    margin-top: 15px;
    padding: 20px 10px;
    border-radius: 5px;
    background: #9e9da0;
    box-shadow: 5px 5px 2px #575656;

    p {
      margin: 0 !important;
      width: 550px;
      font-size: 20px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    span {
      display: inline-block;
      margin-top: 25px;
    }
  }
}
</style>
