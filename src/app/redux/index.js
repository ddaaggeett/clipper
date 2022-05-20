import { useSelector, useDispatch } from 'react-redux'
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
