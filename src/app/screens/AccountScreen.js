import React from 'react'
import { View } from 'react-native'
import { styles } from '../styles'
import { StatusBar } from 'expo-status-bar';
import Account from '../components/Account'
import PlaylistSelectorList from '../components/PlaylistSelectorList'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <Stack.Navigator>
                <Stack.Screen name="Account" component={Account} options={{headerShown: false}} />
                <Stack.Screen name="PlaylistSelectorList" component={PlaylistSelectorList} options={{headerShown: false}} />
            </Stack.Navigator>
        </SafeAreaView>
    )
}
