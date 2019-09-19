var app =require('express')();

var http = require('http').Server(app);

var io = require ('socket.io')(http);

app.get('/', (req, res)  => {
  res.sendFile(__dirname + '/client.html');
})

http.listen(106, () =>{
  console.log('Server is started')
})

var users = [];
var id = 0
console.log('users started');


io.on('connection', socket => {
  console.log('connected');
  socket.on('new-user', name => {
    console.log('new user');
      users[id] = name;
      socket.emit('username',name);
      socket.emit('id',id);
      socket.emit('Allusers',users);
      console.log(users)
      socket.broadcast.emit('user-connected', name);
      id++;
  });
  socket.on('send-chat-message', message => {
    console.log('sending message');
    socket.broadcast.emit('chat-message', { message: message, name: users[id] });
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
    socket.broadcast.emit('user-disconnected', users[id]);
    delete users[id];
  });
});
