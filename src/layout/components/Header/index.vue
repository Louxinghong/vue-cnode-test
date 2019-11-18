<template>
  <header class="header">
    <div class="content">
      <ul class="navigation">
        <li>
          <router-link to="/"> <Icon type="ios-paper" />首页 </router-link>
        </li>
        <li>
          <a
            href="https://github.com/Louxinghong/vue-cnode-test"
            ref
            target="_blank"
          >
            <Icon type="logo-github" />个人中心
          </a>
        </li>
        <li>
          <router-link to="/login"> <Icon type="md-person" />登录 </router-link>
        </li>
      </ul>

      <Dropdown v-if="isLogin">
        <img :src="headerImg" alt />
        <DropdownMenu slot="list">
          <DropdownItem>
            <Button type="text" @click="onExit">退出</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </header>
</template>

<script>
import { getToken, removeToken } from '@/utils/auth'
import { onCreated, value } from 'vue-function-api'

export default {
  name: 'Header',
  setup (props, context) {
    const isLogin = value(false)

    const onExit = () => {
      removeToken()
      context.root.$router.replace({
        path: 'login'
      })
    }

    onCreated(() => {
      if (getToken()) {
        isLogin.value = true
      }
    })

    return {
      isLogin,
      headerImg: require('../../../images/avatar.jpg'),
      onExit
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 600px) {
  .content {
    width: 90%;

    .navigation {
      margin-left: 40px;
      font-size: 15px;
    }
  }
}

@media screen and (max-width: 599px) {
  .content {
    width: 100%;

    .navigation {
      margin-left: 10px;
      font-size: 10px;
    }

    img {
      margin-right: 10px;
    }
  }
}

.header {
  position: fixed;
  background: #ffffff;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 10;
  box-shadow: 0 2px 1px rgba(129, 129, 129, 0.418);

  .content {
    position: absolute;
    height: 50px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    .navigation {
      padding: 5px;
      list-style-type: none;
      display: flex;
      flex-flow: row nowrap;
      // border-bottom: 2px solid #515a6e;

      & > :not(:first-child) {
        margin-left: 20px;
      }

      li {
        .ivu-icon {
          margin-right: 8px;
        }

        a:hover {
          color: rgba(0, 0, 255, 0.692);
        }
      }
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
