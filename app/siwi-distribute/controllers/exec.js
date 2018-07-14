const shell = require('../models/shell')
const redis = require('../models/redis')
class Exec {
    constructor() {

    }

    async run(job) {
        if (!job) {
            return false
        }
        const jobData = JSON.parse(job)
        const type = jobData['type']
        switch (type) {
            case 'redis':
                await redis.run(jobData)
                break;
            case 'shell':
                await shell.run(jobData)
                break;
            default:
                break;
        }
        return true
    }
}

module.exports = new Exec()