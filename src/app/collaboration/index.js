import { useEffect, useState } from 'react'
import { Platform, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector, useDispatch } from 'react-redux'
import Messenger from './components/Messenger'
import GroupSession from './components/Groups'

export default () => {

    const { room } = useSelector(state => state.collaboration)

    return (
        <View style={styles.container}>
            <View style={[styles.column, styles.groups]} ><GroupSession /></View>
            { !room ? null : <View style={[styles.column, styles.messages]} ><Messenger /></View>}
        </View>
    )
}

const Tab = createBottomTabNavigator()

export const CollabDrawer = () => {

    const { room } = useSelector(state => state.collaboration)

    const tabBarOptions = {
        tabBarActiveBackgroundColor: '#222',
        tabBarInactiveBackgroundColor: 'black',
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle:{fontSize:20,position:'absolute',color:'white'},
        tabBarShowIcon: false, // TODO:
    }
    if (room) return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen options={tabBarOptions} name="Groups" component={GroupSession} />
            <Tab.Screen options={tabBarOptions} name="Messages" component={Messenger} />
        </Tab.Navigator>
    )
    else return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen options={tabBarOptions} name="Groups" component={GroupSession} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin:5,
    },
    column: {
        padding: 10,
    },
    groups: {
        borderRightWidth: 3,
        borderRightColor: 'white',
    },
    messages: {
        flex: 1,
    },
})
