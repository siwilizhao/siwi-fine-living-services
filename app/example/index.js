const wait = require('siwi-wait')
class Index {
    constructor(){
        this.init()
    }

    async init () {
        while(true) {
            console.log('example')
            await wait(5*1000)
        }
    }
}

module.exports = new Index()