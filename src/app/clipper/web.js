import { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Clipper from './components/Clipper'
import VideoSelector from './components/VideoSelector'
import ClipManager from './components/ClipManager'
import UnfinishedVideosList from './components/UnfinishedVideosList'
import * as actions from './redux/actions/actionCreators'
import initApp from './hooks'

export default () => {

    const redux = useDispatch()
    const { panelWidth } = useSelector(state => state.clipper)

    useEffect(() => {
        const width = Dimensions.get('window').width / 2
        if (width > 640) redux(actions.setWebPanelWidth(640))
        else redux(actions.setWebPanelWidth(width))
    }, [])

    initApp()

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
