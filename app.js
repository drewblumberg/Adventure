require('./models/Game');

// express application
var home = require('./routes/home');
var games = require('./routes/games');

// modules
var express = require('express');
var http = require('http');
var path = require('path');
var less = require('express-less');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/adventure');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/less', less(__dirname + '/less', { compress: true }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// route definitions
app.get('/', home.index);
app.post('/games/start', games.start);
app.put('/games/:id', games.update);
app.put('/games/:id/attack', games.attack);
app.put('/games/:id/died', games.died);

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
