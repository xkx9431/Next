const Koa = require('koa')
const KoaBody = require('koa-body')
const next  =require('next')
const Router = require('koa-router')
const session = require('koa-session')
const Redis = require('ioredis')
const RedisSessionStore  = require('./server/session-store')
const auth = require('./server/auth')
const api = require('./server/api')
const atob = require('atob')

const dev = process.env.NODE_ENV!='production'

const app = next({ dev })

const handle = app.getRequestHandler()
// 设置nodejs全局增加一个atob方法
global.atob = atob

// create redis client
const redis = new Redis()
const redisSessionStore =  new RedisSessionStore(redis)


app.prepare().then( ()=>{

    const server = new Koa();
    const router = new Router();

    server.keys =['xkx develop Github App']
    
    server.use(KoaBody())

    const SESSION_CONFIG = {
        key:"xkx9431",
        store: redisSessionStore
    }

    server.use(session(SESSION_CONFIG,server))

    // 配置处理GitHub Oauth Login
    auth(server)
    api(server)

    router.get('/a/:id', async (ctx)=>{
        const id  = ctx.params.id
        await handle(ctx.req,ctx.res,{
            pathname:"/a",
            query:{ id }
        })
        ctx.respond  = false
    })
    router.get('/api/user/info', async ctx => {
        const user = ctx.session.userInfo
        if (!user) {
        ctx.status = 401
        ctx.body = 'Need Login'
        } else {
        ctx.body = user
        ctx.set('Content-Type', 'application/json')
        }
    })

    // server.use(async (ctx,next)=> {
    //     if(!ctx.session.user){
    //         ctx.session.user= {
    //             name:'xkx',
    //             age:25
    //         } 
    //     }else{
    //         console.log(ctx.session.user)   
    //     }

    //     await next()

    // })
    // router.get('/set/user',  async (ctx)=>{
    //     ctx.session.user  = {
    //         name:'xkx',
    //         age:25,
    //     }
    //     ctx.body = 'set session sucessful!'
    // })

    // let index= 0
    // server.use( async (ctx,next)=>{
    //     ctx.cookies.set('id',`id: ${index}`)
    //     index+=1
    //     await handle(ctx.req,ctx.res)
    //     ctx.respond =false
    // })
    server.use(router.routes())

    server.use(async (ctx, next) => {
        ctx.req.session = ctx.session
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })
    server.listen(3000,()=>{
        console.log('koa server is listening localhost:3000')
    })
})