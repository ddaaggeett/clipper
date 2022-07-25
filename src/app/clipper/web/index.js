import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { styles } from '../styles'
import Account from '../../xyz/components/Account'
import Clipper from '../components/Clipper'
import VideoSelector from '../components/VideoSelector'
import ClipManager from '../components/ClipManager'
import UnfinishedVideosList from '../components/UnfinishedVideosList'

export default () => {

    const { loggedIn } = useSelector(state => state.account)
    const { panelWidth } = useSelector(state => state.clipper)

    return (
        <View style={styles.container}>
            <View style={[styles.panelRow, styles.contentRow]}>
                <View style={[styles.videoPanel, {position: 'fixed', width: panelWidth}]}>
                    <VideoSelector />
                    <Clipper />
                </View>
                <View style={[styles.clipsPanel, {width: panelWidth}]}>
                    <ClipManager />
                    {/*<UnfinishedVideosList />*/}
                </View>
            </View>
        </View>
    )
}
