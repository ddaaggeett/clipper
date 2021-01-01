import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native"
import React, {
    useState,
} from 'react'
import Clipper from './components/Clipper'
import ClipManager from './components/ClipManager'
import { styles } from './styles'

export default () => {

    const [clipping, setClipping] = useState(true)

    const modeText = () => {
        if(clipping) return "MANAGE CLIPS"
        else return "CLIPPING TOOL"
    }

    return (
        <View>
            <ScrollView>
                {
                    clipping
                    ? <Clipper />
                    : <ClipManager />
                }
                <TouchableOpacity style={[styles.controlButton, {backgroundColor: "black", marginTop: 100}]} onPress={() => setClipping(!clipping)}><Text style={styles.controlButtonText}>{modeText()}</Text></TouchableOpacity>
            </ScrollView>
        </View>
    )
}
