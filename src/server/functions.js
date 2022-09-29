const config = require('../../config')

const getAppObject = (appName) => {
    for (var x = 0; x < config.apps.length; x++) {
        if(config.apps[x].name === appName) return config.apps[x]
    }
}

module.exports = {
    getAppObject,
}
