# siwi-distribute

# 缓存

### SIWI_DISTRIBUTE:COMMANDS_LIST
```json
{
    "type": "shell",
    "command": "pm2 restart siwi-distribute",
    "params": {}
}
```

```json
{
    "type": "redis",
    "command": "",
    "params": {
        "type": "set",
        "key":"COMMON_INTVAL",
        "data": 5
    }
}
```