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
var a=1;
var b="string";
var c={a:1};
var d=[{a:"b"},{c:"d"}];
var e=[{a:1},{b:"string"},{c:[1,2]},{d:{a:"b"}}];
var f=[1,2,3,4];
var g=["hi","how","are","you",{t:'t'}];
var h=[{a:1},{b:2},{c:3}];
var i=[{a:1},{b:"string"},{c:{a:1}}];
var j=[[1,2,3,4],["hi","how","are","you"]];



io.sockets.on('connection', socket => {
  console.log('connected');
  socket.on('new-user', name => {
    console.log('new user');
      users[socket.id] = name;
      io.sockets.emit('username',name);
      socket.emit('id',socket.id);
      socket.emit('Allusers',users);
      console.log(Object.keys(users));
      console.log(Object.values(users));
      console.log(users);
      clients=Object(users);
      console.log(Object(clients));
      socket.emit('clients', Object.values(users));
      socket.broadcast.emit('user-connected', name);



     //just for checking
     socket.emit('I',a);
     socket.emit('S',b);
     socket.emit('Obj',c);
     socket.emit('ObjA',d);
     socket.emit('ObjsA',e);
     socket.emit('IA',f);
     socket.emit('SA',g);
     socket.emit('OIA',h); 
     socket.emit('OOSIA',i);
     socket.emit('AA',j);




  })
   

  socket.on('username', Value => {
    console.log(Value);
    console.log(users);
    var V=Object.values(users);
    var K=Object.keys(users);
    console.log(V.indexOf(Value));
    console.log(K);
    console.log(K[V.indexOf(Value)]);
    if(V.indexOf(Value) != -1)
    {   
     socket.on('send-chat-message', message => {
      socket.to(K[V.indexOf(Value)]).emit('message',{ message:message, name: users[socket.id] });
      });
     console.log('entered')
     console.log('user came out')
    }
    else if(Value == 'All')
    {
     socket.on('send-chat-message', message => {
      console.log('sending message');
      socket.broadcast.emit('chat-message', { message:message, name: users[socket.id] });
      });
    }
    else
    {
     socket.emit('Error',);
    }
  });


  socket.on('disconnect', () => {
    console.log('disconnected');
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
    //users.splice(users.indexOf(socket), 1);
  });


});
