/**
 * 导出函数，并且创建vue实现，并且返回该实列后的对象
 **/
import { createApp } from './app'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()
            // 设置服务器端 router的位置
        router.push(context.url)
        router.onReady(() => {
            /*
             getMatchedComponents()方法的含义是：返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)。
             通常在服务端渲染的数据预加载时使用。
             有关 Router的实列方法含义可以看官网：https://router.vuejs.org/zh/api/#router-forward
            */
            const matchedComponents = router.getMatchedComponents()
                // 如果匹配不到路由的话，执行 reject函数，并且返回404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            // 对所有匹配的路由组件 调用 'asyncData()'
            Promise.all(matchedComponents.map(component => {
                if (component.asyncData) {
                    return component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                // 在所有预取钩子(preFetch hook) resolve 后，
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                context.state = store.state
                resolve(app);
            })
        }, reject)
    })
}