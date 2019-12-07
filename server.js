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

io.sockets.on('connection', socket => {
  console.log('connected');


   socket.on('new-user', name => {
      console.log('new user');
      io.sockets.emit('name',name);
      users[socket.id] = name;
      socket.emit('id',socket.id);
      socket.emit('Allusers',users);
      console.log(Object.keys(users));
      console.log(Object.values(users));
      console.log(users);
      clients=Object(users);
      socket.emit('clients', Object.values(users));
      socket.broadcast.emit('user-connected', name);
      var U=(Object.values(users))
      var u=(Object.keys(users))
      console.log(U.length)
      console.log(u.length-1)
      console.log(socket.id)
      for(i=0;i<U.length-1;i++)
      {
      console.log("for loop");
      console.log(U.length)
      if(U[U.length-1] == U[i])
      {
        io.to(socket.id).emit('Userdisconnect',{name:`${name}`});
        //socket.disconnect(u[Object.values(users).length]);
        console.log("if condition");
        console.log(u[U.length-1]);
        break;
      }
      }
      
   })

   


  socket.on('username', Value => {
    var V=Object.values(users);
    var K=Object.keys(users);
    var N=`${Value.Select}` 
    console.log(N);
    console.log(V.indexOf(N));
    console.log(K[V.indexOf(N)]);
    console.log('entered option value') 
     if(V.indexOf(N) != -1)
     {
      console.log("entered if condition")
      socket.to(K[V.indexOf(N)]).emit('chat-message',{ message:`${Value.message}`, name: users[socket.id] });
      console.log("closing if")
     }
     else
     {
      console.log("enter else")
      socket.broadcast.emit('chat-message', { message:`${Value.message}`, name: users[socket.id] });
      console.log("close else")
     }
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });

});
