const redis = require('../common/lib/redis')
const wait = require('siwi-wait')
const utils = require('../utils')
const emailModle = require('./models/email')
const { SIWI_XIA_COMMON_EMAIL_LIST, NO_TASKING_WAIT_DURATION, EMAIL_SEND_FAIL_LIST } = require('./config')
class Service {
    constructor() {
        this.init()
    }

    async init() {
        while (true) {
            const taskJson = await redis.rpop(SIWI_XIA_COMMON_EMAIL_LIST)
            if (taskJson) {
                const taskData = JSON.parse(taskJson)
                const res = await emailModle.send(taskData)
                if (!res) {
                    await utils.devLog(`${taskJson} 发送失败 ：${JSON.stringify(res)}`)
                    await redis.lpop(EMAIL_SEND_FAIL_LIST, taskJson)
                }
            }
            console.log('wait')
            await utils.devLog('邮件发送队列为空')
            await wait(NO_TASKING_WAIT_DURATION)
        }
    }

}

module.exports = new Service()
