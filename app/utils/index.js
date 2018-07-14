let instance = null
class Utils {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }
    /**
     * 开发日志打印
     *
     * @author siwilizhao <siwilizhao@gmail.com>
     * @param {*} msg
     * @memberof Utils
     */
    async devLog(msg) {
        const chalk  = require('chalk')
        if (process.env.NODE_ENV=='dev') {
            console.log(chalk.blue(msg))
        }
    }

    async getDate() {
        const date = new Date()
        const res = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDay()}日${date.getHours()}时 ${date.getMinutes()}分${date.getSeconds()}秒`
        return res
    }
}
module.exports = new Utils()
