/**
 * 该文件的作用是创建应用程序，并且将其挂载到DOM中，
 **/
import { createApp }  from './app'

const { app, router } = createApp()

// app.$mount('#app')
// App.vue 模板中根元素id='app'
router.onReady(() => {
  app.$mount('#app')
})
