<template>
  <header class="header">
    <div class="content">
      <ul>
        <li>
          <router-link to="/">
            <Icon type="ios-paper" />首页
          </router-link>
        </li>
        <li>
          <a href="https://github.com/Louxinghong/vue-cnode-test" ref target="_blank">
            <Icon type="logo-github" />个人中心
          </a>
        </li>
        <li>
          <router-link to="/login">
            <Icon type="md-person" />登录
          </router-link>
        </li>
      </ul>

      <img :src="headerImg" alt />
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  setup (props) {
    return {
      headerImg: require('../../../images/avatar.jpg')
    }
  }
}
</script>

<style lang="less" scoped>
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
    width: 90%;
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

    ul {
      margin-left: 40px;
      padding: 5px;
      font-size: 15px;
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
