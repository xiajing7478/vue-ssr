/**
 * 该文件的作用是创建应用程序，并且将其挂载到DOM中，
 **/
import { createApp } from './app'
import Vue from 'vue'

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next();
        }
    }
})

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

// app.$mount('#app')
// App.vue 模板中根元素id='app'
router.onReady(() => {
    /**
     * 添加路由钩子，用于处理 asyncData, 在初始路由 resolve 后执行
     * 以便我们不会二次预取已有的数据, 使用 router.beforeResolve(), 确保所有的异步组件都 resolve
     */
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        let diffed = false;
        // 我们只关心非预渲染的组件
        // 所有我们需要对比他们，找出两个品牌列表的差异组件
        const activated = matched.filter((item, idx) => {
            return diffed || (diffed = (prevMatched[idx] !== item))
        });
        if (!activated.length) {
            return next()
        }
        // 这里如果有加载指示器 (loading indicator)，就触发
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {
            // 停止加载指示器(loading indicator)
            next()
        }).catch(next)
    })
    app.$mount('#app')
})