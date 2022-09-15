const getRooms = (packet) => {
    return new Promise((resolve, reject) => {
        const user = packet.user
        let room = packet.room
        let rooms = packet.rooms

        const {updatedRooms, updatedRoom} = updateRooms(rooms, room, user)

        console.log(`updatedRooms = ${JSON.stringify(updatedRooms,null,4)}`)

        resolve({
            updatedRooms,
            updatedRoom,
        })
    })
}

const updateRooms = (rooms, room, user) => {

    rooms = leaveRoom(user, rooms)

    const {updatedRooms, updatedRoom} = joinRoom(rooms, room, user)

    return {
        updatedRooms,
        updatedRoom,
    }

}

const leaveRoom = (user, rooms) => {

    const { userNeedsToLeave, indexRoomLeaving, indexUserLeaving } = getLeavingRoomInfo(user, rooms)

    if (userNeedsToLeave) { // leave a previous room

        let prevRoom = rooms[indexRoomLeaving]

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

    return rooms
}

const joinRoom = (rooms, room, user) => {

    const { userInJoiningRoom, indexJoiningRoom, indexUserJoiningRoom} = getJoiningRoomInfo(rooms, room, user)

    let updatedUsers = room.users

    if (!userInJoiningRoom) {

        updatedUsers = [
            ...room.users,
            user,
        ]

    }

    updatedRoom = {
        ...room,
        users: updatedUsers
    }

    const {exists, index} = getIfRoomExists(updatedRoom, rooms)

    if (!exists) {

        rooms = [
            ...rooms,
            updatedRoom,
        ]
    }
    else {
        rooms = [
            ...rooms.slice(0, index),
            updatedRoom,
            ...rooms.slice(index + 1, rooms.length),
        ]
    }


    updatedRooms = rooms

    return {updatedRooms, updatedRoom}

}

const getIfRoomExists = (room, rooms) => {
    let exists = false
    let index
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id == room.id) {
            exists = true
            index = i
            break
        }
    }
    return {exists, index}
}

const getJoiningRoomInfo = (rooms, room, user) => {

    let userInJoiningRoom = false
    let indexJoiningRoom
    let indexUserJoiningRoom

    for (var i = 0; i < rooms.length; i++) {
        for (var j = 0; j < rooms[i].users.length; j++) {
            if (user.id === rooms[i].users[j].id) {

                userInJoiningRoom = true
                indexJoiningRoom = i
                indexUserJoiningRoom = j
                break

            }
        }
    }
    return { userInJoiningRoom, indexJoiningRoom, indexUserJoiningRoom}
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
