import { View, Text, StyleSheet } from 'react-native'
import Whiteboard from './Whiteboard'
import Arucos from './Arucos'
import { borderWidth } from '../constants'

export default () => {
    return (
        <View style={styles.container}>
            <View style={styles.arucos}><Arucos /></View>
            <View style={styles.whiteboard}><Whiteboard /></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    arucos: {
        zIndex: 1,
    },
    whiteboard: {
        zIndex: 0,
    },
})
