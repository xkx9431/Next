class RedisSessionStore{

    constructor(client){
        this.client = client
    }

    //获取Redis 存储的sesion数据
    async get(sid) {

        const id = getRedisSesionId(sid)
        const data = await this.client.get(id)

        if(!data){
            return null
        }
        try{
            const result = JSON.parse(data)
            return result

        } catch(err){
            console.error(err)
        }

    }



     //设置sesion数据
    async set(sid,sess,ttl){
        const id = getRedisSesionId(sid)
        if(typeof ttl ==='number'){
            ttl = Math.ceil(ttl/1000)
        }

        try{
            const sessStr = JSON.stringify(sess)
            if(ttl){
                await this.client.setex(id,ttl,sessStr)
            }else{
                await this.client.set(id,sessStr)
            }
        }
        catch(err){
            console.error(err)
        }
    }

    
    async destroy(sid){
        const id = getRedisSesionId(sid)
        this.client.del(id)
    }

}

function getRedisSesionId(sid){
    return `ssid:${sid}`
}

module.exports =  RedisSessionStore