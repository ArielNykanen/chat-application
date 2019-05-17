const express = require('express');




const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/chat-application';

const auth = require('./middleware/auth');
const app = express();
// end points
const authEndPoints = require('./end-points/auth');
const mainEndPoints = require('./end-points/main');
const cors = require('cors')


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(auth);
app.use(authEndPoints);
app.use(mainEndPoints);

const port = 8080;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(result => {
  const server = app.listen(port)
  console.log('App is running on port ' + port);

  

  const io = require('socket.io').listen(server)
  io.on('connection', socket => {
    // sockets.add(socket);
    console.log('new connection');
    socket.on('join', function (data) {
      socket.join(data.userName);
      console.log(data.userName + ' is chatting now with ' + data.target);
      socket.broadcast.to(data.userName).emit('new chat', { userName: data.userName, message: 'has joined this chat' });
    })
  });
  
}).catch(err => console.log(err)
); 