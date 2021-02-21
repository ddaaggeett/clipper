import Clipper from '../components/Clipper'
import VideoSelector from '../components/VideoSelector'
import ClipManager from './components/ClipManagerWeb'
import Account from './components/Account'
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { serverIP, port } from '../../../config'
import { io } from 'socket.io-client'
import dataSocket from '../dataSocket'
const socket = io('http://'+ serverIP + ':' + port)

export default () => {

    const { loggedIn, user } = useSelector(state => state.account)
    const { width } = useSelector(state => state.player)
    const redux = useDispatch()
    const clips = useSelector(state => state.clips)
    const [dataSocketPromise, setDataSocketPromise] = useState(dataSocket())

    useEffect(() => {

        dataSocketPromise.then(data => {

            var index

            switch(data.type) {
                case 'updateClip':
                    index = clips.findIndex(item => item.timestamp === data.clip.timestamp)
                    if ( index == -1 ) redux(actions.addClip(data.clip))
                    else redux(actions.updateClip(data.clip, index))
                    break

                case 'deleteClip':
                    index = clips.findIndex(item => item.timestamp === data.clip.timestamp)
                    if (index != -1) {
                        const newClips = clips.slice(0, index).concat(clips.slice(index + 1, clips.length))
                        redux(actions.updateClips(newClips))
                    }
                    break

            }
            setDataSocketPromise(dataSocket())
        })
    }, [dataSocketPromise])

    useEffect(() => {
        redux(actions.setWebPanelWidth(Dimensions.get('window').width/2))
        socket.emit('getUserClips', user.id, userClips => {
            redux(actions.updateClips(userClips))
        })
    },[])

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
