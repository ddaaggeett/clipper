import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Button } from 'react-native'
import { Audio } from 'expo-av'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
    const [recording, setRecording] = React.useState()
    const [uri, setUri] = React.useState()

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        setUri(recording.getURI())
        console.log('Recording stopped and stored at', uri)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Button
                    title={recording ? 'Stop Recording' : 'Start Recording'}
                    onPress={recording ? stopRecording : startRecording}
                />
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
