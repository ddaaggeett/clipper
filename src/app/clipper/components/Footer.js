import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
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
