const shell = require('shelljs')
class Shell {
    constructor () {

    }
    async run(data) {
        const command = data['command']
        await shell.exec(`${command}`)
    }
}
module.exports = new Shell()