<template>
  <footer class="footer">
    <div class="content">
      <p>Post by louxiaohong.</p>
      <p>date on 2019-11-5</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less" scoped>
.footer {
  position: relative;
  background: #ffffff;
  bottom: 0;
  width: 100%;
  height: 80px;
  border-top: 1px solid rgba(129, 129, 129, 0.89);
  z-index: 10;

  .content {
    position: absolute;
    width: 90%;
    height: 80%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
