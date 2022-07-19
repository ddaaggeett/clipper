import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { styles } from '../styles'
import Account from '../../account/components/Account'
import Clipper from '../components/Clipper'
import Footer from '../components/Footer'
import VideoSelector from '../components/VideoSelector'
import ClipManager from '../components/ClipManager'
import UnfinishedVideosList from '../components/UnfinishedVideosList'

export default () => {

    const { loggedIn } = useSelector(state => state.account)
    const { panelWidth } = useSelector(state => state.app)

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
                    {/*<UnfinishedVideosList />*/}
                </View>
            </View>
            <Footer />
        </View>
    )
}
