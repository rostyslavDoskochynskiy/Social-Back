module.exports = server => {
    let io = require('socket.io')(server);
    let Message = require('../models/Message');

    const date = new Date();
    const disconnectionTime = `${date.getFullYear()}-${("0"+(date.getMonth()+1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;

    io.on('connection', socket => {
        socket.on('user', user => {
            socket.broadcast.emit('welcome', user.id);
            socket.on('disconnect', () => {
                // socket.broadcast.emit('exit', user.id);
                socket.broadcast.emit('exit', {user: user.id, disconnectionTime});
                // socket.broadcast.emit('exitTime', disconnectionTime);
            })
        })
    });
};

// {
//     <_id>: {
//             name; '',
//         _id: ''.
//     }
// }
// Object.values(users).map(item => {
//
// })
//
// users[<id>].online = true;




// io.on('connect', function (socket) {
//     socket.on('message', async (message) => {
//         let newMessage = await Message.create(message);
//         newMessage = newMessage.toObject();
//         newMessage.sender = message.sender;
//         newMessage.chat = message.chat;
//         socket.to(message.chat._id).send(newMessage);
//     });
//     socket.on('connectToRoom', (room) => {
//         if (room && room._id) {
//             socket.join(room._id);
//         }
//     });
//     socket.on('leaveRoom', async (data) => {
//         socket.leave(data.chat._id);
//     });
//     socket.on('disconnectFromRoom', (room) => {
//         if (room && room._id) {
//             socket.leave(room._id);
//         }
//     });
//     socket.on('disconnect', () => {
//     });
// });
