# Next

For NEXT.js , Node.js Leanring . 
Using React16.8 + Next.js + Koa2  to creat a Github_NEXT project

### 项目搭建
+ 使用next 作为 koa 中间件使用

    Koa 集成 next 示例：
```javascript
const Koa = require('koa')
const next  =require('next')
const Router = require('koa-router')

const dev = process.env.NODE_ENV!='production'

const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare().then( ()=>{

    const server = new Koa();
    const router = new Router();
    router.get('/a/:id', async (ctx)=>{
        const id  = ctx.params.id
        await handle(ctx.req,ctx.res,{
            pathname:"/a",
            query:{ id }
        })
        ctx.respond  = false
    })
    server.use(router.routes())


    server.use( async (ctx,next)=>{
        await handle(ctx.req,ctx.res)
        ctx.respond =false
    })

    server.listen(3000,()=>{
        console.log('koa server is listening localhost:3000')
    })
})
```
