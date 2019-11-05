<template>
  <div class="layout-container">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Content from './components/Container/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: 'LayoutContainer',
  components: {
    Header,
    Content,
    Footer
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
}
</style>
