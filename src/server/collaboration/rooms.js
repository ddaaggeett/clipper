const { saveRoom, deleteRoom, getRooms, saveMessage } = require('./db')

const updateRooms = (packet) => {
    return new Promise((resolve, reject) => {
        const user = packet.user
        let room = packet.room
        leaveRoom(user)
        .then(prevRoomID => {
            joinRoom(room, user)
            .then(updatedRoom => {
                resolve({
                    updatedRoom,
                    prevRoomID,
                })
            })
        })
    })
}

const leaveRoom = (user) => {
    return new Promise((resolve, reject) => {
        getRooms().then(rooms => {
            const { userNeedsToLeave, indexRoomLeaving, indexUserLeaving } = getLeavingRoomInfo(user, rooms)
            let prevRoomID = null
            if (userNeedsToLeave) { // leave a previous room
                let prevRoom = rooms[indexRoomLeaving]
                prevRoomID = prevRoom.id
                const updatedPrevRoomUsers = [
                    ...prevRoom.users.slice(0, indexUserLeaving),
                    ...prevRoom.users.slice(indexUserLeaving + 1, prevRoom.users.length),
                ]
                prevRoom = {
                    ...prevRoom,
                    users: updatedPrevRoomUsers,
                }
                if (updatedPrevRoomUsers.length == 0) {
                    deleteRoom(prevRoom)
                    .then(() => {
                        resolve(prevRoomID)
                    })
                }
                else {

                    saveRoom(prevRoom)
                    .then(storedRoom => {
                        resolve(prevRoomID)
                    })
                }
            }
            resolve(prevRoomID)
        })
    })
}

const joinRoom = (room, user) => {
    return new Promise((resolve, reject) => {
        getRooms().then(rooms => {
            const indexJoiningRoom = rooms.findIndex(item => item.id === room.id)
            let updatedUsers
            if (indexJoiningRoom == -1) {
                updatedUsers = [
                    user,
                ]
            }
            else {
                updatedUsers = [
                    ...rooms[indexJoiningRoom].users,
                    user,
                ]
            }
            const updatedRoom = {
                ...room,
                id: room.id,
                users: updatedUsers,
            }
            saveRoom(updatedRoom)
            .then(storedRoom => {
                resolve(storedRoom)
            })
        })
    })
}

const getLeavingRoomInfo = (user, rooms) => {

    let userNeedsToLeave = false
    let indexRoomLeaving
    let indexUserLeaving

    for (var i = 0; i < rooms.length; i++) {
        for (var j = 0; j < rooms[i].users.length; j++) {
            if (user.id === rooms[i].users[j].id) {

                userNeedsToLeave = true
                indexRoomLeaving = i
                indexUserLeaving = j
                break

            }
        }
    }
    return { userNeedsToLeave, indexRoomLeaving, indexUserLeaving }
}

const addRoomMessage = (message) => {
    return new Promise((resolve, reject) => {
        saveMessage(message)
        .then(updatedRoom => {
            resolve(updatedRoom)
        })
    })
}

module.exports = {
    updateRooms,
    addRoomMessage,
}
