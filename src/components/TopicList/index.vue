<template>
  <div class="topic-list">
    <div class="item" :class="{loading: loading}" v-for="(item, index) in lists" :key="index">
      <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}" class="avatar">
        <img :src="item.author.avatar_url" alt />
      </router-link>
      <span class="reply-visit">{{item.reply_count}}/{{item.visit_count}}</span>
      <span
        class="tab-status"
        :class="'tab-status-' + item.tab"
      >{{'tab' in item ? transTag(item.tab, $route.query.tab) : '一般'}}</span>
      <router-link :to="{ name: 'Topic', params: {id: item.id}}" class="title">
        <span>{{item.title}}</span>
      </router-link>

      <span class="create-date">{{transDate(item.create_at)}}</span>
    </div>
  </div>
</template>

<script>
import { value } from 'vue-function-api'

function tabSort (props) {
  const tabStatus = value([
    { label: '全部', value: 'all' },
    { label: '精华', value: 'good' },
    { label: '分享', value: 'share' },
    { label: '问答', value: 'ask' },
    { label: '招聘', value: 'job' },
    { label: '客户端', value: 'dev' }
  ])

  return { tabStatus }
}

export default {
  name: 'TopicList',
  global: true,
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const { tabStatus } = tabSort(props)

    const transTag = (tab, routeTab) => {
      if (tab === 'undefined') {
        return '一般'
      } else {
        return routeTab === 'good'
          ? tabStatus.value.find(item => item.value === routeTab).label
          : tabStatus.value.find(item => item.value === tab).label
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
      tabStatus,
      transTag,
      transDate
    }
  }
}
</script>

<style lang="less" scoped>
.topic-list {
  height: 100%;
  .item {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;

    &.loading {
      display: none;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #ffffff;
    }

    & > :not(:first-child) {
      margin-left: 10px;
    }
    .avatar {
      width: 50px;
      height: 80%;
      cursor: pointer;
      padding: 3px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .reply-visit {
      width: 130px;
      text-align: center;
    }

    .tab-status {
      width: 55px;
      color: #000000;
      background: #ffffff;
      text-align: center;
      border-radius: 5px;
      font-size: 13px;
      padding: 3px 0;

      &.tab-status-good {
        color: #ffffff;
        background: #80bd01;
      }
      &.tab-status-share {
        color: #ffffff;
        background: rgb(235, 116, 5);
      }
      &.tab-status-ask {
        color: #ffffff;
        background: crimson;
      }
      &.tab-status-job {
        color: #ffffff;
        background: rgb(41, 104, 240);
      }
      &.tab-status-dev {
        color: #ffffff;
        background: rgb(128, 126, 126);
      }
    }

    .title {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
    }

    .create-date {
      position: relative;
      width: 80px;
      font-size: 12px;
      text-align: center;
      margin-right: 10px;
    }

    &:hover {
      background: #808080b4;
    }
  }
}
</style>
