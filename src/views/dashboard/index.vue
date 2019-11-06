<template>
  <div class="dashboard">
    <div class="tabs">
      <ul>
        <li
          v-for="(item, index) in tabStatus"
          :class="{actived: tabStatus[tabNow] === item}"
          :key="index"
          @click="onChangeTab(item)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="item" v-for="(item, index) in lists" :key="index">
      <img class="avatar" :src="item.author.avatar_url" alt />
      <span class="reply-visit">{{item.reply_count}}/{{item.visit_count}}</span>
      <span
        class="tab-status"
        :class="'tab-status-' + (tabNow === 'good' ? tabNow : item.tab)"
      >{{tabNow === 'good' ? '精华' : tabStatus[item.tab]}}</span>
      <span class="title">{{item.title}}</span>
      <span class="create-date">{{transDate(item.create_at)}}</span>
    </div>
  </div>
</template>

<script>
import { value, watch, onCreated } from 'vue-function-api'
import { getNews } from '@/api/news.js'

function tabSort (props) {
  const tabStatus = value({
    all: '全部',
    good: '精华',
    share: '分享',
    ask: '问答',
    job: '招聘',
    dev: '客户端'
  })

  return { tabStatus }
}

export default {
  name: 'Dashboard',
  setup (props, context) {
    const tabNow = value('all')
    const page = value(1)
    const lists = value([])
    const { tabStatus } = tabSort(props)

    onCreated(async () => {
      await getNews({
        limit: 25,
        mdrender: false,
        tab: context.root.$route.query.tab || 'all',
        page: page.value
      })
        .then(res => {
          lists.value = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    })

    watch(
      () => tabNow.value,
      async value => {
        await getNews({
          limit: 25,
          mdrender: false,
          tab: value,
          page: page.value
        })
          .then(res => {
            lists.value = res.data.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    )

    const onChangeTab = async item => {
      if (item === '全部') {
        tabNow.value = 'all'
      } else if (item === '精华') {
        tabNow.value = 'good'
      } else if (item === '分享') {
        tabNow.value = 'share'
      } else if (item === '问答') {
        tabNow.value = 'ask'
      } else if (item === '招聘') {
        tabNow.value = 'job'
      } else if (item === '客户端') {
        tabNow.value = 'dev'
      }
    }

    const transDate = props => {
      // const nowDate = value(new Date())
      const beforeDate = new Date(props)
      const nowDate = new Date()
      const longTime = (nowDate.getTime() - beforeDate.getTime()) / 1000
      if (longTime < 0) {
        return ''
      } else if (longTime < 30) {
        return '刚刚'
      } else if (longTime < 60) {
        return parseInt(longTime) + '秒前'
      } else if (longTime / 60 < 60) {
        return parseInt(longTime / 60) + '分钟前'
      } else if (longTime / 3600 < 24) {
        return parseInt(longTime / 3600) + '小时前'
      } else if (longTime / 86400 < 31) {
        return parseInt(longTime / 86400) + '天前'
      } else if (longTime / 2592000 < 12) {
        return parseInt(longTime / 2592000) + '月前'
      } else {
        return parseInt(longTime / 31536000) + '年前'
      }
    }

    return {
      tabNow,
      lists,
      tabStatus,
      onChangeTab,
      transDate
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  height: 100%;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: rgba(218, 218, 218, 0.63);

  .item {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 1px solid #ffffff;
    }

    & > :not(:first-child) {
      margin-left: 10px;
    }
    .avatar {
      width: 40px;
      height: 40px;
    }

    .reply-visit {
      width: 80px;
      text-align: center;
    }

    .tab-status {
      width: 45px;
      color: #ffffff;
      text-align: center;
      border-radius: 5px;
      font-size: 13px;
      padding: 3px 0;

      &.tab-status-good {
        background: #80bd01;
      }
      &.tab-status-share {
        background: rgb(235, 116, 5);
      }
      &.tab-status-ask {
        background: crimson;
      }
      &.tab-status-job {
        background: rgb(41, 104, 240);
      }
      &.tab-status-dev {
        background: rgb(128, 126, 126);
      }
    }

    .title {
      width: 70%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .create-date {
      width: 80px;
      font-size: 12px;
      text-align: center;
    }
  }

  .tabs {
    ul {
      list-style-type: none;
      height: 30px;
      display: flex;
      flex-flow: row nowrap;
      padding-bottom: 3px;
      border-bottom: 1px solid #ffffff;

      & > :not(:first-child) {
        margin-left: 13px;
      }

      li {
        padding: 4px;
        cursor: pointer;
        font-size: 15px;
        text-align: center;
        color: #0366d6;
        border-radius: 5px;

        &.actived {
          background: #0366d6;
          color: #ffffff;
        }

        &:hover {
          color: crimson;
        }
      }
    }
  }
}
</style>
