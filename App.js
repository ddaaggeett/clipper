import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react';
import { View, Platform } from 'react-native';
import AppMain from './src/app'
import WebApp from './src/app/web'
import { styles } from "./src/app/styles"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/app/redux';
import configureStoreWeb from './src/app/redux/web';

const store = configureStore().store
const persistor = configureStore().persistor
const storeWeb = configureStoreWeb().store
const persistorWeb = configureStoreWeb().persistor

export default function App() {
    if (Platform.OS === 'web') return (
        <Provider store={storeWeb}>
        <PersistGate loading={null} persistor={persistorWeb}>
            <WebApp />
        </PersistGate>
        </Provider>
    )
    else return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
            <AppMain />
        </NavigationContainer>
        </PersistGate>
        </Provider>
    )
}
