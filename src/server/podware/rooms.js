const getUserOldRoomInfo = (user, rooms) => {
    let roomIndex
    let userIndex
    var userInOldRoom = false
    for(var i = 0; i < rooms.length; i++) {
        const users = rooms[i].users
        for(var j = 0; j < users.length; j++) {
            if (users[j].id === user.id) {
                userInOldRoom = true
                roomIndex = i
                userIndex = j
                break
            }
        }
        break
    }
    return {userInOldRoom, roomIndex, userIndex}
}

module.exports = {
    getUserOldRoomInfo,
}
