<template>
  <div class="topic">
    <div class="topic-top">
      <p class="title-tag">
        <span class="tag" :class="topicDetail.tab">{{tabStatus[topicDetail.tab]}}</span>
        <span class="title">{{topicDetail.title}}</span>
      </p>
      <p class="author">
        <span>作者 {{topicDetail.author.loginname}}</span>
        <span class="separate">|</span>
        <span>发布于 {{topicDetail.create_at | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
        <span class="separate">|</span>
        <span>{{topicDetail.visit_count}} 次浏览</span>
        <span class="separate">|</span>
        <span>最后一次回复于 {{topicDetail.last_reply_at | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
      </p>
    </div>
    <div class="topic-content" v-html="topicDetail.content"></div>
    <div class="topic-replies">
      <p class="count">{{topicDetail.reply_count}}回复</p>
      <ul>
        <li class="reply" v-for="(item, index) in topicDetail.replies" :key="index">
          <div class="reply-top">
            <p>
              <img :src="item.author.avatar_url" alt />
              <span class="name">{{item.author.loginname}}</span>
              <span class="index">{{index + 1}}楼</span>
              <span class="reply-time">发表于{{item.create_at | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
              <span
                class="identity"
                :class="{isAuthor: item.author.loginname === topicDetail.author.loginname }"
              >{{item.author.loginname === topicDetail.author.loginname ? '作者' : '读者'}}</span>
            </p>
            <p>
              <Icon type="md-heart-outline" />
              {{item.ups.length}}
            </p>
          </div>
          <div class="reply-content" v-html="item.content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { value, onCreated } from 'vue-function-api'
import { getNewsDetail } from '@/api/news'

export default {
  name: 'Topic',
  setup (props, context) {
    const loading = value(false)
    const topicDetail = value({})
    const tabStatus = value({
      all: '全部',
      good: '精华',
      share: '分享',
      ask: '问答',
      job: '招聘',
      dev: '客户端'
    })

    onCreated(async () => {
      loading.value = true
      await getNewsDetail(context.root.$route.params.id)
        .then(res => {
          topicDetail.value = res.data.data
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    })

    return {
      topicDetail,
      tabStatus
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 600px) {
  .title-tag {
    display: flex;
    align-items: center;
    .title {
      font-size: 35px;
    }
  }
}

@media screen and (max-width: 599px) {
  .title-tag {
    .title {
      font-size: 20px;
    }
  }
  .author {
    font-size: 10px;
  }
}

.topic {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 10px;
  overflow-x: scroll;

  .topic-top {
    width: 100%;
    border-bottom: 1px solid rgb(194, 193, 193);
    padding: 0 10px 10px;
    margin-bottom: 20px;

    .title-tag {
      position: relative;

      .title {
        font-weight: 600;
      }

      .tag {
        margin-right: 10px;
        display: inline-block;
        border-radius: 5px;
        padding: 2px 5px;
        color: #ffffff;

        &.good {
          background: #80bd01;
        }
        &.share {
          background: rgb(235, 116, 5);
        }
        &.ask {
          background: crimson;
        }
        &.job {
          background: rgb(41, 104, 240);
        }
        &.dev {
          background: rgb(128, 126, 126);
        }
      }
    }

    .author {
      .separate {
        margin: 0 8px;
      }
    }
  }

  .topic-content {
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(194, 193, 193);
  }

  .topic-replies {
    margin-top: 20px;

    .count {
      font-size: 17px;
      margin-bottom: 10px;
    }

    .reply {
      &:not(:first-child) {
        margin-top: 20px;
      }

      .reply-top {
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          align-items: center;

          & > :not(:first-child) {
            margin-left: 10px;
          }

          img {
            width: 50px;
            height: 50px;
          }

          .index,
          .reply-time {
            color: rgb(41, 104, 240);
          }

          .identity {
            padding: 2px;
            border-radius: 5px;
            color: #ffffff;
            background: rgb(235, 116, 5);

            &.isAuthor {
              background: #80bd01;
            }
          }
        }
      }

      .reply-content {
        margin-left: 60px;
      }
    }
  }
}
</style>
