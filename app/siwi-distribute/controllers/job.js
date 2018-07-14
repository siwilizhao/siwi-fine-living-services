const request = require('../../common/lib/request')
const redis = require('../../common/lib/redis')
const { API_DOMAIN, APP_KEY, APP_SECRET, ACCESS_TOKEN } = require('../config')

class Job {
    constructor() {

    }

    async getJobFromOrigin() {
        const token =  await this.getToken()
        if (!token) {
            console.log('未获取:token')
            return false
        }
        try {
            const data = {
                token: token,
                method: 'services.jobs.get',
            }
            const jobs = await request.post(API_DOMAIN, data)
            return jobs
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * 获取请求token
     */
    async getToken() {
        const token = await redis.get(ACCESS_TOKEN)
        if (token) {
            return token
        }
        try {
            const data = {
                app_key: APP_KEY,
                app_secret: APP_SECRET,
                method: 'services.token.get',
            }
            const res = await request.post(API_DOMAIN, data)
            if (res && res['access_token']) {
                await redis.setex(ACCESS_TOKEN, res['expire'] - 120, res['access_token'])
                return res['access_token']
            }
            console.log(res)
            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
module.exports = new Job()