var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileListRouter = require('./routes/file/fileList');
var folderListRouter = require('./routes/file/folderList');
var fileReadRouter = require('./routes/file/read');
var fileUploadRouter = require('./routes/file/upload');

var app = express();

var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('ssh/server.key', 'utf8');
var certificate = fs.readFileSync('ssh/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var httpsServer = https.createServer(credentials, app);
var httpServer = http.createServer(app);

const HTTPS_PORT = 8053;
const HTTP_PORT = 8054;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({}));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/file/list', fileListRouter);
app.use('/api/file/folder', folderListRouter);
app.use('/api/file/read', fileReadRouter);
app.use('/api/file/upload', fileUploadRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

httpsServer.listen(HTTPS_PORT);
httpServer.listen(HTTP_PORT);

console.log(`server is running on port ${HTTPS_PORT} for https and ${HTTP_PORT} for http`)

module.exports = app;
