import { Platform } from 'react-native'
import { createStore , applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logger from 'redux-logger'
import rootReducer from './reducers'

let middleware
if (Platform.OS === 'web') middleware = applyMiddleware(thunk, logger)
else middleware = applyMiddleware(thunk)

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, middleware)
    let persistor = persistStore(store)
    // persistor.purge() // TODO: run as separate script when necessary
    return { store, persistor }
}
