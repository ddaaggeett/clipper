const getRooms = (packet) => {
    return new Promise((resolve, reject) => {
        const user = packet.user
        let room = packet.room
        let rooms = packet.rooms

        const {updatedRooms, updatedRoom} = updateRooms(rooms, room, user)

        resolve({
            updatedRooms,
            updatedRoom,
        })
    })
}

/*
get updatedROOM:
get updatedROOMS:

if (rooms are empty) {

    add user to room
    updatedROOM = room ********************

    add room to rooms
    updatedROOMS = rooms *************************

    resolve (updatedROOMS, updatedROOM)
}

else {


    if (user is not in room) {
        add user to room
    }

    updatedROOM = room *********************************



    if (updatedROOM does NOT exist in rooms) {

        add updatedROOM to rooms

        updatedROOMS = rooms *******************************

        resolve (updatedROOMS, updatedROOM)

    }
    else {

        previousROOM ******************

        if (updatedROOM == previousROOM) {

            replace previousROOM with updatedROOM in rooms

            updatedRooms = rooms *****************************

        }
        else {

            remove user from previousROOM

            updatedLeavingROOM ****************************

            if (updatedLeavingROOM has no users) {

                remove previousROOM from rooms

            }
            else {

                replace previousROOM with updatedLeavingROOM in rooms

            }

            add updatedROOM to rooms

            updatedROOMS = rooms ***********************
        }

        resolve (updatedROOMS, updatedROOM)
    }

}
*/
const updateRooms = (rooms, room, user) => {

    let updatedRoom
    let updatedRooms

    if (rooms.length == 0) {
        updatedRoom = {
            ...room,
            users: [user],
        }
        updatedRooms = [
            ...rooms,
            room,
        ]
        return({
            updatedRooms,
            updatedRoom,
        })
    }
    else {

        const userInRoom = isUserInJoiningRoom(room, user)
        if (!userInRoom) {
            room = {
                ...room,
                users: {
                    ...room.users,
                    user,
                }
            }
        }

        updatedRoom = room

        const {roomExists, roomIndex} = getIfRoomExists(room, rooms)

        if (!roomExists) {
            updatedRooms = [
                ...rooms,
                updatedRoom,
            ]

            return({
                updatedRooms,
                updatedRoom,
            })
        }
        else {

            const previousRoom = rooms[roomIndex]

            if (updatedRoom.id === previousRoom.id) {

                updatedRooms = [
                    ...rooms.slice(0, roomIndex),
                    updatedRoom,
                    ...rooms.slice(roomIndex + 1, rooms.length)
                ]

            }
            else {

                const userIndex = getUserIndex(user, previousRoom)
                const previousUsers = previousRoom.users

                const updatedUsers = [
                    ...previousUsers.slice(0, userIndex),
                    ...previousUsers.slice(userIndex + 1, previousUsers.length),
                ]

                const updatedPreviousRoom = {
                    ...previousRoom,
                    users: updatedUsers,
                }

                if (updatedPreviousRoom.users.length == 0) {

                    updatedRooms = [
                        ...rooms.slice(0, roomIndex),
                        ...rooms.slice(roomIndex + 1, rooms.length),
                    ]

                }
                else {

                    updatedRooms = [
                        ...rooms.slice(0, roomIndex),
                        updatedPreviousRoom,
                        ...rooms.slice(roomIndex + 1, rooms.length),
                    ]

                }

                updatedRooms = [
                    ...updatedRooms,
                    updatedRoom,
                ]

            }

            return({
                updatedRooms,
                updatedRoom,
            })
        }

    }


}

const getUserIndex = (user, room) => {
    let userIndex
    for(var j = 0; j < room.users.length; j++) {
        if (room.users[j].id === user.id) {
            userIndex = j
            break
        }
    }

    return userIndex
}

const updateOldRoom = (rooms, roomIndex, userIndex) => {

    const room = rooms[roomIndex]
    let users = rooms[roomIndex].users

    users = [
        ...users.slice(0, userIndex),
        ...users.slice(userIndex + 1, users.length),
    ]

    if (users.length == 0) return null
    else return {
        id: room.id,
        users,
    }
}

const getIfRoomExists = (room, rooms) => {
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id == room.id) return true
    }
    return false
}

const isUserInJoiningRoom = (room, user) => {
    for (var i = 0; i < room.users.length; i++) {
        if (room.users[i].id === user.id) return true
    }
    return false
}

module.exports = {
    getRooms,
}
