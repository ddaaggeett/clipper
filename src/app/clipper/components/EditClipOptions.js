import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import DeleteClip from './DeleteClip'
import DownloadClip from './DownloadClip'
import { useSelector } from 'react-redux'

export default (props) => {

    const { confirmDelete } = useSelector(state => state.clipper)

    return (
        <View style={styles.contentRow}>
            {
                confirmDelete
                ?   null
                :   <View style={styles.contentRow}>
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => props.handleEditClip()}
                            >
                            <Text style={styles.controlButtonText}>SAVE (ctrl + enter)</Text>
                        </TouchableOpacity>
                        <DownloadClip />
                    </View>
            }
            <DeleteClip />
        </View>
    )
}

const styles = StyleSheet.create({
    controlButton: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor:'black',
    },
    controlButtonText: {
        textAlign:"center",
        color: 'white',
        fontWeight:"bold",
    },
    contentRow: {
        flexDirection:"row",
    },
})
