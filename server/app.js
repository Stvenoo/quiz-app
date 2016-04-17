var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./config');
var questions = require('./questions');
var users = {};

app.set('port', (process.env.PORT || 8000));

// serve our js bundle
app.use(express.static(path.join(__dirname, '../dashboard/static')));
app.use(express.static(path.join(__dirname, '../client/static')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, '../dashboard/index.html'));
});


io.on('connection', (socket) => {

  if (socket.handshake.headers.referer.indexOf(config.host + config.dashboardEndpoint) === -1) {
    users[socket.id] = {};
    io.emit('total-users', Object.keys(users).length);
  }

  socket.on('disconnect', function() {
    delete users[socket.id];
    io.emit('total-users', Object.keys(users).length);
    io.emit('get-users', users);
  });

  socket.on('set-user', (user) => {
    users[socket.id] = {
      name: user
    };
    io.emit('get-users', users);
  });

  socket.on('get-question', questionId => {
    const question = questions.getQuestion(questionId);
    io.emit('receive-question', question);
  });

  socket.on('check-answer', answer => {
    const result = questions.checkAnswer(answer.questionId, answer.choice);
    io.emit('receive-answer', result);
  });

});

http.listen(app.get('port'), function() {
  console.log('listening on *:8000');
});
