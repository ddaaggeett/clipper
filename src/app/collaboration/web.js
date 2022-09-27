import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Messenger from './components/Messenger'
import GroupSession from './components/Groups'

export default () => {

    const { room } = useSelector(state => state.collaboration)

    return (
        <View style={styles.container}>
            <View style={[styles.column, styles.groups]} ><GroupSession /></View>
            { !room ? null : <View style={[styles.column, styles.messages]} ><Messenger /></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin:5,
    },
    column: {
        padding: 10,
    },
    groups: {
        borderRightWidth: 3,
        borderRightColor: 'white',
    },
    messages: {
        flex: 1,
    },
})
