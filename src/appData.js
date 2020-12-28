import AsyncStorage from '@react-native-async-storage/async-storage'

const isJSON = (value) => {
    try {
        JSON.parse(value)
    } catch (e) {
        return false
    }
    return true
}

export const storeData = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            switch(typeof(value)) {
                case "string":
                    AsyncStorage.setItem(key, value)
                    resolve()
                    break
                case "object":
                    AsyncStorage.setItem(key, JSON.stringify(value))
                    resolve()
                    break
                default:
                    break
            }
        } catch (error) {
            console.log("storeData error: ", error)
        }
    })
}

export const getData = (key) => {
    return new Promise((resolve,reject) => {
        try {
            AsyncStorage.getItem(key).then(value => {
                if (value !== null) {
                    switch(isJSON(value)) {
                        case false: // string
                            resolve(value)
                            break
                        case true: // object
                            resolve(JSON.parse(value))
                            break
                        default:
                            break
                    }
                }
                else resolve(null)
            })
        } catch (error) {
            console.log("getData error: ", error)
        }
    })
}
