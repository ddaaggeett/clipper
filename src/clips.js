import {
    storeData,
    getData,
} from './appData'

export const addClip = (clip) => {
    return new Promise((resolve,reject) => {
        var object
        getData('clips').then(data => {
            if(data !== null) {
                object = [...data, clip]
                storeData('clips', object)
            }
            else {
                object = [clip]
                storeData('clips', object)
            }
            resolve(object) // setClips(object)
        })
    })
}

export const getClips = () => {
    getData('clips').then(data => {
        if(data !== null) return data // array of clips
        else return []
    })
}
