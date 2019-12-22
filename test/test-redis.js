async function test(){
    const Redis = require('ioredis')

    const redis = new Redis({
        port:6378,
        password:123450

    })

    const keys = await redis.keys('*')

    console.log(keys)
    console.log(await redis.get('b'))
}

test()