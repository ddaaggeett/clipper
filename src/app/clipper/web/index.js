import { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Account from '../../account/components/Account'
import Clipper from '../components/Clipper'
import VideoSelector from '../components/VideoSelector'
import ClipManager from '../components/ClipManager'
import UnfinishedVideosList from '../components/UnfinishedVideosList'
import * as actions from '../redux/actions/actionCreators'
import { io } from 'socket.io-client'
import { serverIP, socketPort } from '../../../../config'

const socket = io('http://'+ serverIP + ':' + socketPort.clipper)

export default () => {

    const redux = useDispatch()
    const { loggedIn, user } = useSelector(state => state.account)
    const { panelWidth } = useSelector(state => state.clipper)
    const { pending } = useSelector(state => state.clips)

    useEffect(() => {
        const width = Dimensions.get('window').width / 2
        if (width > 640) redux(actions.setWebPanelWidth(640))
        else redux(actions.setWebPanelWidth(width))


        if (loggedIn && user !== null) {
            const packet = {
                userID: user.id,
                pendingClips: pending,
            }
            socket.emit('getUserClips', packet, userClips => {
                redux(actions.clearPending())
                redux(actions.updateClips(userClips))
            })
        }
    }, [])

    return (
        <View style={[styles.container,styles.panelRow, styles.contentRow]}>
            <View style={[styles.videoPanel, {position: 'fixed', width: panelWidth}]}>
                <VideoSelector />
                <Clipper />
            </View>
            <View style={[styles.clipsPanel, {width: panelWidth}]}>
                <ClipManager />
                {/*<UnfinishedVideosList />*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        backgroundColor: '#000',
    },
    panelRow: {
        alignSelf: 'center',
    },
    contentRow: {
        flexDirection:"row",
    },
    videoPanel: {
        right: '50%',
    },
    clipsPanel: {
        left: '50%'
    },
})
