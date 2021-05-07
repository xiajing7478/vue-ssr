<template>
  <div id="app">
    <router-view></router-view>
    <h1>{{msg}}</h1>
    <input type="text" v-model="msg" />
  </div>
</template>
<script>
 export default {
    name: 'app',
    data() {
      return {
        msg: 'vue-ssr-demo'
      }
    }
  }
</script>
<style lang="stylus">
  h1
    color red
    font-size 22px
</style>
