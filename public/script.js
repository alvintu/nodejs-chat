const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('send-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
const name = prompt('What is your name?')
appendMessage(name + " has joined the best nba chat in the world")
socket.emit('new-user', roomName, name)

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    // appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
})
}

socket.on('chat-message', data => {
    console.log(data)
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})

socket.on('user-connected', name => {
    console.log('user connected')
    appendMessage(`${name} connected`)
})


socket.on('user-disconnected', name => {
    console.log('user disconnected')
    appendMessage(`${name} disconnected`)
})


m


function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}