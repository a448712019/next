async function test () {
    const Redis = require('ioredis')

    const redis = new Redis({
        host: '127.0.0.1',
        port: 6379,
    })

    // const keys = await redis.keys('*')
    await redis.set('c', 123)
    const keys = await redis.keys('*')
    // console.log(keys)
}
test()