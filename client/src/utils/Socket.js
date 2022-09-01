import socketio from 'socket.io-client'
import {WS_SOCKET_HOSTNAME} from '../config.js'

export default function initSocket() {
   return socketio.connect(WS_SOCKET_HOSTNAME, { transports: ['websocket'] });
}

// export let io = socketio.connect(SOCKET_URL, { transports: ['websocket'] });