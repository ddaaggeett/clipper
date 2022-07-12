export default function getContentID (copiedText) {
    var video_id = ''
    try {
        return getYoutubeID(copiedText)
    }
    catch(e) {
        return copiedText
    }
}

const getYoutubeID = (copiedText) => {
    var splitter = ''
    if(copiedText.includes(".be/")) splitter = ".be/"
    else if(copiedText.includes("v=")) splitter = "v="
    else if(copiedText.includes("list=")) splitter = "list="

    // if copiedText contains "v=" and "list=", it will default to "list="
    switch(splitter) {
        case ".be/":
            return copiedText.split(splitter)[1]
            break
        case "v=":
        case "list=":
            var contentID = copiedText.split(splitter)[1]
            var cut = contentID.indexOf('&')
            if(cut != -1) {
                contentID = contentID.substring(0, cut)
            }
            return contentID;
            break
        default:
            return null
    }
}
