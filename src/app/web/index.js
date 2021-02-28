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
import useDataSocketHook from '../dataSocket'
const socket = io('http://'+ serverIP + ':' + port)

export default () => {

    const { loggedIn, user } = useSelector(state => state.account)
    const { width } = useSelector(state => state.player)
    const redux = useDispatch()
    const { clips, pending } = useSelector(state => state.clips)

    useDataSocketHook()

    useEffect(() => {
        redux(actions.setWebPanelWidth(Dimensions.get('window').width/2))
        const packet = {
            user_id: user.id,
            pendingClips: pending,
        }
        socket.emit('getUserClips', packet, userClips => {
            redux(actions.clearPending())
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
