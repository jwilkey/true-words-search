<template>
  <div id="app" class="theme-back">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '../static/less/common.less';

html, body {
  height: 100%;
  margin: 0;
  font-family: sans-serif;
}
#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
