const io = require('socket.io')(3000, {
 cors: {
    origin: "*",
  },
})

const users = {}

io.on('connection', socket => {


    socket.on('new-user', username => {
        users[socket.id] = username
        socket.broadcast.emit('user-connected', username)
        
    });

    socket.on('disconnect', username => {
        username = users[socket.id]
        socket.broadcast.emit('user-disconnected', username)
        delete username
    })
    
    console.log('new User')
    // socket.emit('chat-message', 'Hello World')    
    socket.on('send-chat-message', message => {
        console.log("message is" +  message  + "user is" + users[socket.id])
        socket.broadcast.emit('chat-message', {message: message, username: users[socket.id]})

    })
})