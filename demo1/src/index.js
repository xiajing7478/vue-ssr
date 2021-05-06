const Vue = require('vue')
const Koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8')
})
const port = process.env.port || 5001
const app = new Koa()
const router = new Router()

router.get('*', async(ctx, next) => {
    const app = new Vue({
        data: {
            url: ctx.url
        },
        template: `<div>访问的URL是：{{url}}</div>`
    })

    const content = {
        title: `vue服务器渲染组件`,
        meta: `<meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="" content="vue服务器渲染组件">`
    }

    try {
        renderer.renderToString(app, content, (err, html) => {
            if (err) {
                throw err
                return
            }
            ctx.status = 200
            ctx.body = html
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