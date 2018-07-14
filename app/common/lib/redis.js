const options = {
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    password: '',
    db: 0
}
const Redis = require('siwi-ioredis')
const redisInstance = new Redis(options)
const redis = redisInstance.redisClient
module.exports = redis