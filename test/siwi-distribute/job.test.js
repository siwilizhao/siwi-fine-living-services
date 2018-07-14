const redis = require('../../app/common/lib/redis')
const {COMMANDS_LIST} = require('../../app/siwi-distribute/config')
describe('', () => {
    it('shell', async () => {
        const job = {
            "type": "shell",
            "command": "pm2 start example",
            "params": {}
        }
        await redis.lpush(COMMANDS_LIST, JSON.stringify(job))
    });
    it('redis', async () => {
        const job = {
            "type": "redis",
            "command": "",
            "params": {
                "type": "set",
                "key":"COMMON_WAIT_INTVAL",
                "value": 5
            }
        }
        const res = await redis.lpush(COMMANDS_LIST, JSON.stringify(job))
        console.log(res)
    });
});

