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
    <topic-list :lists="lists" :loading="loading"></topic-list>

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
        .catch(() => {
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
          .catch(() => {
            loading.value = false
          })
      },
      { lazy: true }
    )

    const currentChange = page => {
      context.root.$router.push({
        name: context.root.$route.name,
        query: {
          tab: context.root.$route.query.tab
            ? context.root.$route.query.tab
            : 'all',
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
    height: 1500px;
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

  .ivu-page {
    margin-top: 20px;

    &.loading {
      display: none;
    }
  }
}
</style>
