import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './routers'
import { createStore } from './store/index'
// 导出函数，用于创建新的应用程序
export function createApp() {
    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        // 注入router到根vue实列中
        router,
        store,
        // 根实列简单的渲染应用程序组件
        render: h => h(App)
    })
    return { app, router, store }
}