<template>
    <div>item页 请求数据结果：{{ item }}</div>
</template>

<script>
  export default {
    name: "item",
    // 我们需要通过访问路由，来决定获取哪部分数据，这也决定了哪些组件需要被渲染。
    // 因此我们在组件 Item.vue 路由组件上暴露了一个自定义静态函数 asyncData.
    // 注意：asyncData函数会在组件实例化之前被调用。因此不能使用this，需要将store和路由信息作为参数传递进去。
    asyncData({ store, route }) {
      // return store.dispatch('fetchItem', route.params.id)
      return store.dispatch('fetchItem', 'name');
    },
    computed: {
      item() {
        console.log(this.$store.state);
        return this.$store.state.items;
        // return this.$store.state.items[this.$route.params.id]
      }
    }
  }
</script>

<style scoped>

</style>
