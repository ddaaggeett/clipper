import { View } from 'react-native'
import Camera from './components/Camera'
import initApp from './hooks'

export default () => {

    initApp()

    return (
        <Camera />
    )
}
