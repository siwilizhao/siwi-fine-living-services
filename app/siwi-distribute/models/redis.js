const redis = require('../../common/lib/redis')
class Redis {
    constructor() {

    }
    async run (data) {
        const {type, key, value} = data['params']
        switch (type) {
            case 'set':
                await redis.set(key, value)
                break;
            case 'hset':
                await redis.hset(key, value)
                break;
            case 'hdel':
                await redis.hdel(key)
                break;
            case 'del':
                await redis.del(key)
                break;
            case 'lpush':
                await redis.lpush(key, value)
                break;
            default:    
                break;
        }
    }
}
module.exports = new Redis()