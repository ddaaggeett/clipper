import 'react-native-gesture-handler'
import { View, Platform } from 'react-native';
import { Persistor } from "./src/app/components/ReduxPurge"
import { Provider } from 'react-redux'
import configureRedux from './src/app/redux'
import configureReduxWeb from './src/app/redux/web'


export default function App() {
    const store = configureRedux().store
    const storeWeb = configureReduxWeb().store
    if (Platform.OS === 'web') return (
        <Provider store={storeWeb}>
        <Persistor />
        </Provider>
    )
    else return (
        <Provider store={store}>
        <Persistor />
        </Provider>
    )
}
