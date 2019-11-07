<template>
  <div class="user">
    <div class="user-info">
      <img :src="userDetail.avatar_url" alt />
    </div>
    <div class="user-topic-collection"></div>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/user'
import { value, onCreated } from 'vue-function-api'

export default {
  name: 'User',
  setup (props, context) {
    const userDetail = value({})

    onCreated(async () => {
      await getUserDetail(context.root.$route.params.loginname)
        .then(res => {
          console.log(res)
          userDetail.value = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    })

    return {
      userDetail
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-wrap: row nowrap;

  .user-info {
    position: relative;
    display: inline-block;
    border: 1px solid black;
    height: 100%;
    width: 30%;
  }

  .user-topic-collection {
    position: relative;
    display: inline-block;
    border: 1px solid black;
    height: 100%;
    width: 70%;
  }
}
</style>
