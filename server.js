// //use connect-mongo for session storage in production
require("dotenv").config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bp = require('body-parser');
const app = express();
const server = http.Server(app);
const io = socketio(server);
const path = require("path");
const session = require("express-session");
const cp = require("cookie-parser");
const passport = require("./Config/Passport/Passport.js");
const cors = require("cors");
const routes = require("./Src/Routes/Login");
const flash = require("connect-flash");
const db = require('./Config/db').chats;

//
app.use(cp("somesecret"));
app.use(
  session({
    secret: "somesecret"
  })
);

app.use(cors());

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((r, s, n) => {
  console.log("in a mid", r.user);
  n();
});

app.use("/", routes);
//
//
// io.on('connection', (socket) => {
//
//   // socket.on('new_message', (data) => {
//   //   userdata.findAll({where:{sid:socket.id}}).then(function (name) {
//   //     db.create({
//   //       chat:data,
//   //       sid:socket.id,
//   //       username:name[0].username
//   //     }).then(function () {
//   //       let sen = {chat:data,username:name[0].username}
//   //       io.emit('recv_message', sen)
//   //     }).catch(function(err)
//   //     {
//   //       throw err;
//   //     });
//   //   });
//   //
//   // })
//   // socket.on('name', (data) => {
//   //   userdata.findOne({where:{username:data.name}}).then(function (dab) {
//   //     if(dab) {
//   //       db.update({sid:socket.id},{where:{username:data.name}}).then(function () {
//   //         console.log('success');
//   //
//   //       })
//   //       userdata.update({sid:socket.id},{where:{username:data.name}}).then(function () {
//   //         console.log('success');
//   //
//   //       })
//   //       db.findAll().then(function (chat) {
//   //         io.emit('getname', chat);
//   //       })
//   //     }
//   //     else
//   //     {   console.log(data.name);
//   //       console.log(data.pass);
//   //       userdata.create({
//   //         username:data.name,
//   //         pass:data.pass,
//   //         sid:socket.id
//   //       })
//   //     }
//   //   })
//   // })
// })
//




io.on('connection', (socket) => {
  console.log("New client connected");
  console.log(socket.id);
  socket.on('some',(data) => {
    console.log(data);
  })


});

server.listen(1234, function () {
  console.log("Server started on http://localhost:1234");
});
