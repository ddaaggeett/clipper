const getRooms = (packet) => {
    return new Promise((resolve, reject) => {
        const user = packet.user
        let room = packet.room
        let rooms = packet.rooms

        const { roomsAfterLeaving, prevRoomID } = leaveRoom(user, rooms)

        const {updatedRooms, updatedRoom} = joinRoom(roomsAfterLeaving, room, user)

        resolve({
            updatedRooms,
            updatedRoom,
            prevRoomID,
        })
    })
}

const leaveRoom = (user, rooms) => {

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

            rooms = [
                ...rooms.slice(0, indexRoomLeaving),
                ...rooms.slice(indexRoomLeaving + 1, rooms.length),
            ]
        }
        else {
            rooms = [
                ...rooms.slice(0, indexRoomLeaving),
                prevRoom,
                ...rooms.slice(indexRoomLeaving + 1, rooms.length),
            ]
        }
    }

    const roomsAfterLeaving = rooms

    return {roomsAfterLeaving, prevRoomID}
}

const joinRoom = (rooms, room, user) => {

    const indexJoiningRoom = rooms.findIndex(item => item.id === room.id)
    let updatedRoom
    let updatedUsers

    if (indexJoiningRoom == -1) {
        updatedUsers = [
            user,
        ]
        updatedRoom = {
            ...room,
            id: room.id,
            users: updatedUsers,
        }
        rooms = [
            ...rooms,
            updatedRoom,
        ]
    }
    else {
        updatedUsers = [
            ...rooms[indexJoiningRoom].users,
            user,
        ]
        updatedRoom = {
            ...room,
            id: room.id,
            users: updatedUsers,
        }
        rooms = [
            ...rooms.slice(0, indexJoiningRoom),
            updatedRoom,
            ...rooms.slice(indexJoiningRoom + 1, rooms.length),
        ]
    }
    updatedRooms = rooms
    return {updatedRooms, updatedRoom}
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

module.exports = {
    getRooms,
}
