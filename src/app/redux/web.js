import { useSelector, useDispatch } from 'react-redux'
import { createStore , applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
// import localforage from 'localforage' // TODO: rather localforage than storage
import rootReducer from './reducers'
import logger from 'redux-logger'

const middleware = applyMiddleware(thunk, logger)
const persistConfig = {
    key: 'root',
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {

    const redux = useDispatch()
    const app = useSelector(state => state.app)

    let store = createStore(persistedReducer, middleware)
    let persistor = persistStore(store)

    if (app.purgeRedux) {
        persistor.purge()
        redux(actions.purgeRedux(false))
        return { store, persistor }
    }
    else return { store, persistor }
}
