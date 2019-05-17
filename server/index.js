const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/chat-application';

const auth = require('./middleware/auth');
const authEndPoints = require('./end-points/auth');
const app = express();
app.use(authEndPoints);




app.use(bodyParser.json());
app.use(auth);
app.use((req, res, next) => {


})
const port = 8080;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(result => {
  const msger = require('./util/messenger');

  const server = app.listen(port)
  console.log('App is running on port ' + port);
  console.log('consuming messages..!');
  
  msger.consume('redis')
    .subscribe(msg => {
      console.log('Got message- ', msg);
  });


  

}).catch(err => console.log(err)
); 