import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');
function subscribeToTimer(cb) {
    socket.on('msgToClient', message => {
        if (cb) {
            cb(message);
        }
    });
    socket.emit('subscribeToTimer', 1000);
}

function subscribeToChat(room, callback) {
    socket.on(room, msg => {
        if (typeof callback === 'function') {
            callback(msg);
        }
    })
}

function unsubscribeToChat(room) {
    socket.off(room)
}

export { subscribeToTimer, subscribeToChat, unsubscribeToChat };
