import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Button } from 'react-native'
import { Audio } from 'expo-av'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as FileSystem from 'expo-file-system'
import { serverIP, expressPort } from '../../../config'

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

    React.useEffect(() => {
        if(uri != undefined) {
            const url = `http://${serverIP}:${expressPort}/patchAudioFile`
            FileSystem.uploadAsync(url, uri, {
                fieldName: "file",
                httpMethod: "PATCH",
                uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
            })
            .then(object => {
                console.log('\nupload working')
                console.log(JSON.stringify(object,null,4))
            })
            .catch(error => {
                console.log('\nerror upload')
                console.log(error)
            })
        }
    }, [uri])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar style="light" />
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
