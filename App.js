import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react';
import { View } from 'react-native';
import AppMain from './src/app'
import { styles } from "./src/app/styles"

export default function App() {
    return (
        <NavigationContainer>
        <View style={styles.container}>
            <AppMain />
        </View>
        </NavigationContainer>
    )
}
