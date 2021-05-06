const Vue = require('vue');
// 创建渲染器
const renderer = require('vue-server-renderer').createRenderer();

const app = new Vue({
    template: `<div>hello ssr.....</div>`
})

renderer.renderToString(app, (error, html) => {
    if (error) {
        throw error
        return
    }
    // <div data-server-rendered="true">hello ssr.....</div>
    // 在我们div中有一个特殊的属性 data-server-rendered，该属性的作用是告诉VUE这是服务器渲染的元素。并且应该以激活的模式进行挂载。
    console.log(html)
})

// 也可以用promise方式
// renderer.renderToString(app).then(html => {
//   console.log(html)
// }).catch(error => {
//   console.log(error)
// })


/**
 * Vue SSR依赖包 vue-server-render, 它的调用支持有2种格式，createRenderer() 和 createBundleRenderer(), 那么createRenderer()是以
 * vue组件为入口的，而 createBundleRenderer()以打包后的js文件或json文件为入口的。
 * 所以createBundleRenderer()的作用和 createRenderer() 作用是一样的, 无非就是支持的入口文件不一样而已
 */
// const bundleRenderer = require('vue-server-renderer').createBundleRenderer;
// let renderer = bundleRenderer('./package.json');
// console.log(renderer);
//{
//  renderToString: [Function: renderToString],
//  renderToStream: [Function: renderToStream]
//}