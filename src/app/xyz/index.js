import React from 'react'
import { View, Platform } from 'react-native'
import { styles } from '../clipper/styles'
import { StatusBar } from 'expo-status-bar';
import AccountScreen from './components/Account'
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context'

const Stack = createStackNavigator()

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <Stack.Navigator>
                <Stack.Screen name="Account" component={AccountScreen} options={{headerShown: false}} />
            </Stack.Navigator>
        </SafeAreaView>
    )
}
