<template>
  <div class="dashboard">
    <div class="tabs">
      <ul>
        <li
          v-for="(item, index) in tabStatus"
          :key="index"
          :class="{actived: $route.query.tab === tabStatus[index].value || (tabStatus[index].value === 'all' && !$route.query.tab)}"
        >
          <router-link
            :to="{path: 'dashboard', query: {tab: tabStatus[index].value, page: 1}}"
          >{{tabStatus[index].label}}</router-link>
        </li>
      </ul>
    </div>
    <div class="waiting" :class="{loading: loading}">
      <Spin>
        <Icon type="ios-loading" size="55" class="load"></Icon>
      </Spin>
    </div>
    <div class="item" :class="{loading: loading}" v-for="(item, index) in lists" :key="index">
      <img class="avatar" :src="item.author.avatar_url" alt />
      <span class="reply-visit">{{item.reply_count}}/{{item.visit_count}}</span>
      <span
        class="tab-status"
        :class="'tab-status-' + item.tab"
      >{{'tab' in item ? transTag(item.tab, $route.query.tab) : '一般'}}</span>
      <span class="title">{{item.title}}</span>
      <span class="create-date">{{transDate(item.create_at)}}</span>
    </div>
    <Page
      :class="{loading: loading}"
      :total="total"
      :page-size="pageSize"
      :current.sync="page"
      show-elevator
      @on-change="currentChange"
    />
  </div>
</template>

<script>
import { value, watch, onCreated } from 'vue-function-api'
import { getNews } from '@/api/news.js'

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
  name: 'Dashboard',
  setup (props, context) {
    const tabNow = value('all')
    const page = value(1)
    const pageSize = value(25)
    const total = value(9999)
    const lists = value([])
    const loading = value(false)
    const { tabStatus } = tabSort(props)

    onCreated(async () => {
      loading.value = true
      page.value = parseInt(context.root.$route.query.page) || 1
      await getNews({
        limit: pageSize.value,
        mdrender: false,
        tab: context.root.$route.query.tab || 'all',
        page: page.value
      })
        .then(res => {
          lists.value = res.data.data
          loading.value = false
        })
        .catch(error => {
          console.log(error)
          loading.value = false
        })
    })

    watch(
      () => context.root.$route,
      async (to, from) => {
        if (to.name !== 'Dashboard') {
          return
        }

        if (to.query.page === 1 || !to.query.page) {
          page.value = 1
        } else {
          page.value = to.query.page
        }
        loading.value = true
        await getNews({
          limit: 25,
          mdrender: false,
          tab: to.query.tab,
          page: page.value
        })
          .then(res => {
            loading.value = false
            lists.value = res.data.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    )

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

    const currentChange = page => {
      context.root.$router.push({
        name: context.root.$route.name,
        query: {
          tab: context.root.$route.query.tab,
          page: page
        }
      })
    }

    return {
      tabNow,
      lists,
      page,
      pageSize,
      total,
      loading,
      tabStatus,
      transTag,
      transDate,
      currentChange
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

  .waiting {
    position: relative;
    width: 300px;
    height: 300px;
    display: none;
    margin: 0 auto;
    padding-top: 50px;

    &.loading {
      display: block;
    }
    .ivu-spin {
      .load {
        animation: ani-demo-spin 1s linear infinite;
      }

      @keyframes ani-demo-spin {
        from {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(180deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }

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
      width: 4.5%;
      height: 80%;
      cursor: pointer;
    }

    .reply-visit {
      width: 10%;
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
  }

  .ivu-page {
    margin-top: 20px;

    &.loading {
      display: none;
    }
  }
}
</style>
