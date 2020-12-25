import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            AsyncStorage.setItem(key, value)
            resolve()
        } catch (e) {}
    })
}

export const getData = (key) => {
    return new Promise((resolve,reject) => {
        try {
            const value = AsyncStorage.getItem(key)
            if(value !== null) resolve(value)
        } catch(e) {}
    })
}
