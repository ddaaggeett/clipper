import React, {
    useState,
} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { styles } from '../styles'
import {
    useSelector,
    useDispatch,
 } from 'react-redux'
import {
    serverIP,
    port,
} from '../../../config'
import * as AuthSession from 'expo-app-auth'
import { io } from 'socket.io-client'
const socket = io('http://'+ serverIP + ':' + port)
import * as actions from '../redux/actions/actionCreators'

export default (props) => {

    const redux = useDispatch()
    const user = useSelector(state => state.account.user)
    const accessToken = useSelector(state => state.account.accessToken)
    const playlists = useSelector(state => state.account.playlists)
    const playlist = useSelector(state => state.account.playlist)
    const [selectingPlaylist, setSelectingPlaylist] = useState(false)

    const getPlaylists = () => {
        socket.emit('getAllPlaylists', accessToken, data => {
            redux(actions.setPlaylists(data))
        })
    }

    const handleSelectPlaylist = () => {
        setSelectingPlaylist(true)
        getPlaylists()
    }

    const selectPlaylist = (playlist) => {
        setSelectingPlaylist(false)
        redux(actions.setPlaylist(playlist))
    }

    const renderItem = ({ item }) => (
        <View style={styles.clipItem}>
            <TouchableOpacity onPress={() => selectPlaylist({id: item.id, title: item.title})}>
                <View style={{flex:1}}>
                    <Text style={styles.clipItemText}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    const ListOfPlaylists = () => {
        return (
            <View>
            {
                selectingPlaylist
                ?   <FlatList
                        data={playlists}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        />
                :   null
            }
            </View>
        )
    }

    return (
        <View style={{marginTop:25}}>
        {
            playlist.id !== null
            ?   <View>
                    <TouchableOpacity style={styles.controlButton} onPress={() => handleSelectPlaylist()}>
                    {
                        selectingPlaylist
                        ?   <Text style={styles.controlButtonText}>{`select playlist`}</Text>
                        :   <Text style={styles.controlButtonText}>{`playlist: ${playlist.title}`}</Text>
                    }
                    </TouchableOpacity>
                    <ListOfPlaylists />
                </View>
            :   <View>
                    <TouchableOpacity style={styles.controlButton} onPress={() => handleSelectPlaylist()}>
                    {
                        selectingPlaylist
                        ?   <Text style={styles.controlButtonText}>{`select playlist`}</Text>
                        :   <Text style={styles.controlButtonText}>{`${user.name}'s playlists`}</Text>
                    }
                    </TouchableOpacity>
                    <ListOfPlaylists />
                </View>
        }
        </View>
    )
}
