import Clipper from '../components/Clipper'
import VideoSelector from '../components/VideoSelector'
import ClipManager from './components/ClipManagerWeb'
import Account from './components/Account'
import React, { useEffect } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { serverIP, port } from '../../../config'
import { io } from 'socket.io-client'
const socket = io('http://'+ serverIP + ':' + port)

export default () => {

    const loggedIn = useSelector(state => state.account.loggedIn)
    const width = useSelector(state => state.player.width)
    const clips = useSelector(state => state.clips)
    const redux = useDispatch()

    useEffect(() => {
        redux(actions.setWebPanelWidth(Dimensions.get('window').width/2))
        socket.emit('allClips', clips, updatedClipsFromDB => {
            updatedClipsFromDB.forEach(clipFromDB => {
                const index = clips.findIndex(clip => clip.timestamp === clipFromDB.timestamp)
                redux(actions.updateClip(clipFromDB, index))
            })
        })
    },[]) // run only once on startup

    if(!loggedIn) return (
        <View style={styles.container}>
            <Account />
        </View>
    )
    else return (
        <View style={[styles.container, styles.contentRow]}>
            <View style={{width: width}}>
                <Account />
                <Text style={{color:'white'}}>CLIPPER Web App</Text>
                <VideoSelector />
                <Clipper />
            </View>
            <View style={{width: width}}>
                <ClipManager />
            </View>
        </View>
    )
}
