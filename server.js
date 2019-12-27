const Koa = require('koa')
const next  =require('next')
const Router = require('koa-router')
const session = require('koa-session')

const dev = process.env.NODE_ENV!='production'

const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare().then( ()=>{

    const server = new Koa();
    const router = new Router();

    server.keys =['xkx develop Github App']
    const SESSION_CONFIG = {
        key:"xkx9431",
        // store:{}
    }

    server.use(session(SESSION_CONFIG,server))

    server.use(async (ctx,next)=> {
        if(!ctx.session.user){
            ctx.session.user= {
                name:'xkx',
                age:18
            } 
        }else{
            console.log(ctx.session.user)   
        }

        await next()

    })




    server.use(router.routes())

    router.get('/a/:id', async (ctx)=>{
        const id  = ctx.params.id
        await handle(ctx.req,ctx.res,{
            pathname:"/a",
            query:{ id }
        })
        ctx.respond  = false
    })

    router.get('/set/user',  async (ctx)=>{
        ctx.session.user  = {
            name:'xkx',
            age:25,
        }
        ctx.body = 'set session sucessful!'
    })

    let index= 0
    server.use( async (ctx,next)=>{
        ctx.cookies.set('id',`id: ${index}`)
        index+=1
        await handle(ctx.req,ctx.res)
        ctx.respond =false
    })

    server.listen(3000,()=>{
        console.log('koa server is listening localhost:3000')
    })
})