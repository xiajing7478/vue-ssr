/**
 * 导出函数，并且创建vue实现，并且返回该实列后的对象
 **/
import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // 设置服务器端 router的位置
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      resolve(app)
    }, reject)
  })
}
