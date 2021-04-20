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
    const { panelWidth } = useSelector(state => state.app)
    const redux = useDispatch()
    const { clips, pending } = useSelector(state => state.clips)

    useDataSocketHook()

    useEffect(() => {
        const width = Dimensions.get('window').width / 2
        if (width > 640) redux(actions.setWebPanelWidth(640))
        else redux(actions.setWebPanelWidth(width))
        if (loggedIn) {
            const packet = {
                user_id: user.id,
                pendingClips: pending,
            }
            socket.emit('getUserClips', packet, userClips => {
                redux(actions.clearPending())
                redux(actions.updateClips(userClips))
            })
        }
    },[])

    if(!loggedIn) return (
        <View style={styles.container}>
            <Account />
        </View>
    )
    else return (
        <View style={styles.container}>
            <Account />
            <View style={[styles.panelRow, styles.contentRow]}>
                <View style={[styles.videoPanel, {position: 'fixed', width: panelWidth}]}>
                    <VideoSelector />
                    <Clipper />
                </View>
                <View style={[styles.clipsPanel, {width: panelWidth}]}>
                    <ClipManager />
                </View>
            </View>
        </View>
    )
}
