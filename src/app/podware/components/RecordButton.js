import { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Audio } from 'expo-av'
import { useSelector, useDispatch } from 'react-redux'
import * as FileSystem from 'expo-file-system'
import { serverIP, expressPort } from '../../../../config'
import * as actions from '../redux/actions/actionCreators'

export default () => {

    const redux = useDispatch()
    const { uri } = useSelector(state => state.podware)
    const [recording, setRecording] = useState()

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
        await recording.stopAndUnloadAsync()
        redux(actions.setUri(recording.getURI()))
        console.log('Recording stopped and stored at', uri)
    }

    useEffect(() => {
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
        <TouchableOpacity
            style={styles.button}
            onPress={recording ? stopRecording : startRecording}
            >
            <Text style={styles.text}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
        </TouchableOpacity>
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
    button: {
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'green',
    },
})
