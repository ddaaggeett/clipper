import React from 'react'
import { View, StyleSheet } from 'react-native'
import ClipManager from './components/ClipManager'
import ClipDetails from './components/ClipDetails'
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()
import { SafeAreaView } from 'react-native-safe-area-context'
import initApp from './hooks'


export default () => {

    initApp()

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <Stack.Navigator>
                <Stack.Screen name="ClipManager" component={ClipManager} options={{headerShown: false}} />
                <Stack.Screen name="ClipDetails" component={ClipDetails} options={{headerShown: false}} />
            </Stack.Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
})
