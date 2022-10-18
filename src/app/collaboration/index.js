import { useEffect, useState } from 'react'
import { Platform, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Messenger from './components/Messenger'
import GroupSession from './components/Groups'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {

    const { room } = useSelector(state => state.collaboration)

    if (Platform.OS === 'web') return (
        <View style={styles.webcontainer}>
            <View style={[styles.column, styles.groups]} ><GroupSession /></View>
            { !room ? null : <View style={[styles.column, styles.messages]} ><Messenger /></View>}
        </View>
    )
    else return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <StatusBar style="light" />

            <View style={styles.container}>
                <View style={[styles.column, styles.groups]} ><GroupSession /></View>
                { !room ? null : <View style={[styles.column, styles.messages]} ><Messenger /></View>}
            </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    webcontainer: {
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
