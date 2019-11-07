<template>
  <header class="header">
    <div class="content">
      <Menu mode="horizontal" active-name="1">
        <MenuItem name="1">
          <router-link to="/">
            <Icon type="ios-paper" />首页
          </router-link>
        </MenuItem>
        <MenuItem name="2">
          <a href="https://github.com/Louxinghong/vue-cnode-test" ref target="_blank">
            <Icon type="logo-github" />个人中心
          </a>
        </MenuItem>
        <MenuItem name="3">
          <router-link to="/login">
            <Icon type="md-person" />登录
          </router-link>
        </MenuItem>
      </Menu>

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
  height: 80px;
  z-index: 10;

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

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .ivu-menu {
      display: inline-block;
      width: 50% !important;
      height: 50px !important;
    }
  }
}
</style>
