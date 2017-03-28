var http = require('http');

var express = require('express');
var config = require('./config.js');

var app = express();
var server = http.createServer(app);

require('./lib/routes/static').addRoutes(app, config);

app.use(express.logger());                  // Log requests to the console
app.use(express.bodyParser());              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
app.use(express.cookieParser(config.server.cookieSecret)); // Hash cookies with this secret
app.use(express.cookieSession());           // Store the session in the (secret) cookie


require('./lib/routes/appFile').addRoutes(app, config);

server.listen(config.server.listenPort, '0.0.0.0', 511, function(){
    var open = require('open');
    open('http://localhost:' + config.server.listenPort + '/');
});
console.log('server - listening on port: '+ config.server.listenPort);