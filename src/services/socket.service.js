// import io from 'socket.io-client'
// import { userService } from './user.service'

// const SOCKET_EMIT_LOGIN = 'set-user-socket'
// const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

// const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
// export const socketService = createSocketService()

// // for debugging from console
// window.socketService = socketService

// socketService.setup()

// function createSocketService() {
//     var socket = null
//     const socketService = {
//         setup() {
//             socket = io(baseUrl)
//             setTimeout(() => {
//                 const user = userService.getLoggedinUser()
//                 if (user) this.login(user._id)
//             }, 500)
//         },
//         on(eventName, cb) {
//             socket.on(eventName, cb)
//         },
//         off(eventName, cb = null) {
//             if (!socket) return
//             if (!cb) socket.removeAllListeners(eventName)
//             else socket.off(eventName, cb)
//         },
//         emit(eventName, data) {
//             socket.emit(eventName, data)
//         },
//         login(userId) {
//             socket.emit(SOCKET_EMIT_LOGIN, userId)
//             // socket.id = userId
//         },
//         logout() {
//             socket.emit(SOCKET_EMIT_LOGOUT)
//         },
//         getSocketId() {
//             return socket.id
//         },
//         terminate() {
//             socket = null
//         },
//     }
//     return socketService
// }

// // Basic Tests
// // function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
// // socketService.on('baba', cb)
// // socketService.on('baba', cb)
// // socketService.on('baba', cb)
// // socketService.on('mama', cb)
// // socketService.emit('baba', 'Puk')
// // socketService.off('baba', cb)
