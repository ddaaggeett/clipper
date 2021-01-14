import React from 'react'
import {
    View,
} from 'react-native'
import { styles } from '../styles'
import ClipManager from '../components/ClipManager'
import ClipDetails from '../components/ClipDetails'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()

export default () => {
    return (
        <View  style={[styles.container,{paddingTop:25}]}>
            <Stack.Navigator>
                <Stack.Screen name="ClipManager" component={ClipManager} options={{headerShown: false}} />
                <Stack.Screen name="ClipDetails" component={ClipDetails} options={{headerShown: false}} />
            </Stack.Navigator>
        </View>
    )
}
