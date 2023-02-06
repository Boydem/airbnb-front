import { showSuccessMsg } from './event-bus.service'
import { httpService } from './http.service'
import { socketService } from './socket.service'
import { store } from '../store/store'
import { makeId, utilService } from './util.service'
import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER_DB = 'userDB'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    // update,
}

function getUsers() {
    return storageService.query(STORAGE_KEY_USER_DB)
    // return httpService.get(`user`)
}

async function getById(userId) {
    return await storageService.get(STORAGE_KEY_USER_DB, userId)
    // const user = await httpService.get(`user/${userId}`)
    // return user
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY_USER_DB, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(_id, boards) {
    const user = await storageService.get(STORAGE_KEY_USER_DB, _id)

    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {}

async function signup(userCred) {}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// Testing

window.userService = userService
// _createUsersForTesting()

// async function _createUsersForTesting() {
//     const userCred = {
//         fullname: 'Yaron Shapira',
//         imgUrl: 'https://avatars.githubusercontent.com/u/84077420?v=4',
//         password: '1',
//         username: '1',
//         _id: 'I6ju1',
//     }
//     try {
//         const user = await httpService.post('auth/signup', userCred)
//         return saveLocalUser(user)
//     } catch (err) {
//         console.log(err)
//         throw err
//     }
// }
