import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'
import ClipManager from './components/ClipManager'
import ClipDetails from './components/ClipDetails'
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
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
