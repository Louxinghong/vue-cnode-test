<template>
  <section class="container">
    <div class="content">
      <router-view />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<style lang="less" scoped>
.container {
  height: 1200px;
  position: relative;
  margin: 80px 0 0;

  .content {
    height: 100%;
    width: 80%;
    margin: 0 10%;
    padding: 20px 0;
  }
}
</style>
