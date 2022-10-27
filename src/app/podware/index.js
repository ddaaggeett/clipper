import { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import RecordButton from './components/RecordButton'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {

    const { uri } = useSelector(state => state.podware)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar style="light" />
                <RecordButton />
                <Text style={styles.text}>{`last recording uri:\n${uri}`}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    text: {
        color: 'white',
    },
})
