import React from 'react';
import { View } from 'react-native';
import AppMain from './src/app'
import { styles } from "./src/app/styles"

export default function App() {
    return (
        <View style={styles.container}>
            <AppMain />
        </View>
    )
}
