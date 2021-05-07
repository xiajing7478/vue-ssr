/**
 * 动态生成html模板
 * `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>vue服务器渲染组件</title>
              </head>
              <body>${html}</body>
            </html>
            `
 */
const Vue = require('vue')
const Koa = require('koa')
const Router = require('koa-router')
const renderer = require('vue-server-renderer').createRenderer()
const port = process.env.port || 5000
const app = new Koa()
const router = new Router()

router.get('*', async(ctx, next) => {
    const App = new Vue({
        data: {
            url: ctx.url
        },
        template: `<div>访问的URL是：{{url}}</div>`
    })

    try {
        renderer.renderToString(App, (err, html) => {
            if (err) {
                throw err
                return
            }
            ctx.status = 200
            ctx.body = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>vue服务器渲染组件</title>
              </head>
              <body>${html}</body>
            </html>
            `
        })
    } catch (err) {
        ctx.status = 500;
        ctx.body = '服务器错误';
    }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});