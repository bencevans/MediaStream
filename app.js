var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path');

var app = express()
, server = http.createServer(app)
, io = require('socket.io').listen(server);

io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);           

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.all('*', function(req, res, next) {res.locals.layout=false; next();})
app.get('/', routes.index);
app.get('/test', routes.test);

io.sockets.on('connection', function(socket) {
  socket.on('test', function (command, data) {
    console.log(command);
    if(command == "broadcast")
      socket.broadcast.emit('broadcast', data);
  });
})




server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
