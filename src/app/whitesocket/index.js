import { View } from 'react-native'
import Camera from './components/Camera'
import useDataSocketHook from './dataSocket'

export default () => {

    useDataSocketHook()

    return (
        <Camera />
    )
}
