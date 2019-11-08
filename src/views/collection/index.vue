<template>
  <div class="collection">
    <p v-if="lists.length > 0">个人收藏</p>
    <p v-else>暂无收藏</p>
    <topic-list :lists="lists" :loading="loading"></topic-list>
  </div>
</template>

<script>
import { value, onCreated } from 'vue-function-api'
import { getUserCollection } from '@/api/user'

export default {
  name: 'UserCollection',
  setup (props, context) {
    const lists = value([])
    const loading = value(false)

    onCreated(async () => {
      loading.value = true
      await getUserCollection(context.root.$route.params.loginname)
        .then(res => {
          lists.value = res.data.data
          loading.value = false
        })
        .catch(error => {
          console.log(error)
          loading.value = false
        })
    })
    return {
      lists,
      loading
    }
  }
}
</script>

<style lang="less" scoped>
.collection {
  height: 100%;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: rgba(218, 218, 218, 0.63);
}
</style>
