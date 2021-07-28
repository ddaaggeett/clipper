/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import DeleteClip from './DeleteClip'
import DownloadClip from './DownloadClip'
import { useSelector } from 'react-redux'

export default (props) => {

    const { confirmDelete } = useSelector(state => state.app)

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
