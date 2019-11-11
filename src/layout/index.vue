<template>
  <div class="layout-container">
    <Header />
    <Content />
    <BackToTop />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Content from './components/Container/index.vue'
import Footer from './components/Footer/index.vue'
import BackToTop from './components/BackToTop/index.vue'

export default {
  name: 'LayoutContainer',
  components: {
    Header,
    Content,
    BackToTop,
    Footer
  },
  setup (props, context) {}
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
}
</style>
