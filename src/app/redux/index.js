import { createStore , applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import localforage from 'localforage' // TODO: rather localforage than storage
import rootReducer from './reducers'
import logger from 'redux-logger'
import {Platform} from 'react-native'

var persistConfig
var middleware

if (Platform.OS === 'web') {
    middleware = applyMiddleware(thunk, logger)
    persistConfig = {
        key: 'root',
        storage: storage,
    }
}
else { // ios/android
    middleware = applyMiddleware(thunk)
    persistConfig = {
        key: 'root',
        storage: AsyncStorage,
    }
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, middleware)
    let persistor = persistStore(store)
    // persistor.purge() // TODO: run as separate script when necessary
    return { store, persistor }
}
