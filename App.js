import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react';
import { View } from 'react-native';
import AppMain from './src/app'
import { styles } from "./src/app/styles"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/app/redux';

const store = configureStore().store
const persistor = configureStore().persistor

export default function App() {
    return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
            <AppMain />
        </NavigationContainer>
        </PersistGate>
        </Provider>
    )
}
