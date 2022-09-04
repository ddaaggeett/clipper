import { Platform } from 'react-native'
import { createStore , applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import localforage from 'localforage'
import logger from 'redux-logger'
import rootReducer from './reducers'

let middleware
let storage
if (Platform.OS === 'web') {
    middleware = applyMiddleware(thunk, logger)
    storage = localforage
}
else {
    middleware = applyMiddleware(thunk)
    storage = AsyncStorage
}

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, middleware)
    let persistor = persistStore(store)
    // persistor.purge() // TODO: run as separate script when necessary
    return { store, persistor }
}
