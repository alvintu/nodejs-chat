const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('send-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const username = prompt('What is your name?')
appendMessage(username + " has joined the best nba chat in the world")
socket.emit('new-user', username)

socket.on('chat-message', data => {
    console.log(data)
    appendMessage(`${data.username}: ${data.message}`)
})

socket.on('user-connected', username => {
    console.log('user connected')
    appendMessage(`${username} connected`)
})


socket.on('user-disconnected', username => {
    console.log('user disconnected')
    appendMessage(`${username} disconnected`)
})


messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})


function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}