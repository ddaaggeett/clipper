import React from 'react';
import WebApp from '../src/app/web'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from '../src/app/redux/web';

const store = configureStore().store
const persistor = configureStore().persistor

export default function App() {
    return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <WebApp />
        </PersistGate>
        </Provider>
    )
}
