import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ClipperScreen from './ClipperScreen'
import ClipManagerScreen from './ClipManagerScreen'
import useDataSocketHook from './dataSocket'

const Tab = createBottomTabNavigator()

export default () => {

    useDataSocketHook()

    const tabBarOptions = {
        tabBarActiveBackgroundColor: '#222',
        tabBarInactiveBackgroundColor: 'black',
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle:{fontSize:20,position:'absolute',color:'white'},
        tabBarShowIcon: false,
    }
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen options={tabBarOptions} name="Clipper" component={ClipperScreen} />
            <Tab.Screen options={tabBarOptions} name="Clips" component={ClipManagerScreen} />
        </Tab.Navigator>
    )
}
