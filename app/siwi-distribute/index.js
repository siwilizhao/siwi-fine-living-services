const wait = require('siwi-wait')
const Job = require('./controllers/job')
const Exec = require('./controllers/exec')
const redis = require('../common/lib/redis')
const {
    COMMANDS_LIST
} = require('./config')
class Services {
    constructor() {
        this.init()
        this.exec()
    }
    async init() {
        while (true) {
            const jobs = await Job.getJobFromOrigin()
            if (jobs) {
                for (const job of jobs) {
                    await redis.lpush(COMMANDS_LIST, JSON.stringify(job))
                }
            } else {
                await wait(5 * 1000)
                console.log('未获取指令')
            }
        }
    }

    async exec() {
        while (true) {
            const job = await redis.rpop(COMMANDS_LIST)
            if (job) {
                await Exec.run(job)
            } else {
                await wait(5 * 1000)
                console.log('没有需要执行的命令')
            }
        }
    }
}
module.exports = new Services()