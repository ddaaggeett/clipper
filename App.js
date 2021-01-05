import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react';
import { View } from 'react-native';
import AppMain from './src/app'
import { styles } from "./src/app/styles"
import { Provider } from 'react-redux'
import configureStore from './src/app/redux';
const store = configureStore();

export default function App() {
    return (
        <Provider store={store}>
        <NavigationContainer>
        <View style={styles.container}>
            <AppMain />
        </View>
        </NavigationContainer>
        </Provider>
    )
}
