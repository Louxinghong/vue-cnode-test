<template>
  <div class="user">
    <div class="user-info">
      <img class="avatar" :src="userDetail.avatar_url" alt />
      <span class="name">{{userDetail.loginname}}</span>
      <span class="score">{{userDetail.score}}积分</span>
      <span class="create-date">创建于{{userDetail.create_at | dateFormat('YYYY-MM-DD')}}</span>
      <router-link
        :to="{ name: 'UserCollection', params: {loginname: userDetail.loginname}}"
        class="title"
      >
        <span>查看收藏的话题</span>
      </router-link>
    </div>
    <div class="user-topic-reply">
      <div class="topic-content">
        <p>创建的话题</p>
        <div class="topics">
          <ul>
            <li v-for="(item, index) in userDetail.recent_topics" :key="index">
              <img :src="item.author.avatar_url" alt />
              <router-link :to="{ name: 'Topic', params: {id: item.id}}" class="title">
                <span>{{item.title}}</span>
              </router-link>
              <span
                class="last-time"
              >上一次回复于{{item.last_reply_at | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="reply-content">
        <p>参与的话题</p>
        <div class="replies">
          <ul>
            <li v-for="(item, index) in userDetail.recent_replies" :key="index">
              <img :src="item.author.avatar_url" alt />
              <router-link :to="{ name: 'Topic', params: {id: item.id}}" class="title">
                <span>{{item.title}}</span>
              </router-link>
              <span>上一次回复于{{item.last_reply_at | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/user'
import { value, onCreated } from 'vue-function-api'

export default {
  name: 'User',
  setup (props, context) {
    const loading = value(false)
    const userDetail = value({})

    onCreated(async () => {
      loading.value = true
      await getUserDetail(context.root.$route.params.loginname)
        .then(res => {
          loading.value = false
          userDetail.value = res.data.data
        })
        .catch(() => {
          loading.value = false
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
    height: 100%;
    width: 30%;
    padding: 10px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    & > :not(:first-child) {
      margin-top: 20px;
    }

    .avatar {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }

    .name {
      font-size: 23px;
    }

    .score {
      font-size: 15px;
    }

    .create-date {
      font-size: 13px;
    }
  }

  .user-topic-reply {
    position: relative;
    display: inline-block;
    border-left: 1px solid rgb(143, 142, 142);
    height: 1500px;
    width: 70%;

    .topic-content,
    .reply-content {
      width: 100%;
      height: 50%;

      p {
        margin: 10px;
        font-size: 20px;
      }

      .topics,
      .replies {
        height: 90%;
        width: 100%;
        // background: rgba(184, 182, 182, 0.534);
        ul {
          list-style-type: none;
          width: 100%;
          height: 100%;
          // overflow: hidden;
          overflow-y: scroll;

          li {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            height: 50px;

            img {
              width: 40px;
              height: 40px;
            }

            .title {
              width: 50%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
              font-size: 15px;
            }

            .last-time {
              display: inline-block;
              width: 35%;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
