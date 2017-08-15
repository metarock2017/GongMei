const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 2333;

app.use(express.static('./'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user has connected');
});

http.listen(port);

io.on('connection', function(socket) {
    socket.on('c_send', function(msg) {
        console.log('message: ' + msg);
    });
    socket.on('c_send', function(msg) {
        io.emit('s_send', msg);
    });
});
