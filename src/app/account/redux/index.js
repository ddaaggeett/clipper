import { createStore , applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from './reducers'

const middleware = applyMiddleware(thunk)
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
