var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  lessMiddleware = require('less-middleware'),
  mongo = require('mongodb'),
  monk = require('monk'),
  routes = require('./routes/index'),
  users = require('./routes/users');

var app = express(),
  db = monk('localhost:27017/qachecklist');

// build less
app.use(lessMiddleware(__dirname + '/less', {
  dest: __dirname + '/public',
  preprocess: {
    path: function(pathname, req) {
      return pathname.replace(path.sep + 'stylesheets'+ path.sep, path.sep);
    }
  },
  debug: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
  console.log(req.body);
    req.db = db;
    next();
});

app.use(function (req, res, next) {
    res.renderWithData = function (view, model, data) {
        model.data = JSON.stringify(data);
        res.render(view, model);
    };
    next();
});

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function(){
  console.log('Example app listening on port');
});

module.exports = app;
