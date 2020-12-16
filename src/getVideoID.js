export default function getVideoID (copiedText) {
    var video_id = ''
    try {
        return getYoutubeID(copiedText)
    }
    catch(e) {
        return copiedText
    }
}

const getYoutubeID = (copiedText) => {
    if(copiedText.includes(".be/")) { // copied from YouTube mobile app
        var video_id = copiedText.split('.be/')[1]
        return video_id
    }
    else if(copiedText.includes("v=")) { // copied from YouTube bowser site
        var video_id = copiedText.split('v=')[1]
        var cut = video_id.indexOf('&')
        if(cut != -1) {
            video_id = video_id.substring(0, cut)
        }
        return video_id;
    }
    else {
        return null
    }
}
