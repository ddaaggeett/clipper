import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { appName } from '../../../../config'

export default (props) => {

    const year = new Date().getFullYear()

    return (
        <View style={[styles.footer, { backgroundImage: 'linear-gradient(black, #333)' }]}>
            <View
                style={[styles.contentRow, styles.footerLinkGroup, {position: 'absolute'}]}>
                <TouchableOpacity style={styles.footerLink}>
                    <Text style={styles.footerText}>{`about ${appName}`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerLink}>
                    <Text style={styles.footerText}>{`${`\u00A9`}${year}`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    footer: {
        flex:1,
        margin: 0,
        width: '100%',
        zIndex: -1,
        bottom: 0,
    },
    footerText: {
        color: '#aaa',
        fontWeight: 'bold',
        fontFamily: 'sans',
    },
    footerLink: {
        marginRight: 20,
    },
    footerLinkGroup: {
        right: 15,
        bottom: 10,
    },
    contentRow: {
        flexDirection:"row",
    },
})
