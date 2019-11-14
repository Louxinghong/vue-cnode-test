<template>
  <section class="container">
    <div class="content">
      <router-view />
    </div>
  </section>
</template>

<script>
import { onCreated, watch } from 'vue-function-api'

export default {
  name: 'Container',
  setup (props, context) {
    onCreated(() => {
      window.scrollTo(0, 0)
    })

    watch(
      () => context.root.$route,
      (to, from) => {
        window.scrollTo(0, 0)
      }
    )
  }
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 600px) {
  .content {
    width: 80%;
    margin: 0 10%;
  }
}

@media screen and (max-width: 599px) {
  .content {
    width: 95%;
    margin: 0 2.5%;
  }
}

.container {
  min-height: 100vh;
  position: relative;
  margin: 60px 0 0;

  .content {
    height: 100%;
    padding: 20px 0;
  }
}
</style>
