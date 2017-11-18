var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./routes')
 
var app = express();

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router(app)

//filters
app.locals.postshow100 = value => value.slice(0, 100)
app.locals.randomColor = () => {
  var colors = ['red lighten-1', 'red darken-1', 'red accent-2', 'pink lighten-2', 'pink darken-1', 'pink accent-2', 'purple lighten-2', 'purple darken-1', 'purple darken-1', 'deep-purple accent-2', 'indigo accent-2', 'blue lighten-1', 'blue accent-2', 'blue accent-2', 'cyan', 'cyan accent-2', 'teal lighten-1', 'teal lighten-3', 'teal accent-2', 'green lighten-2', 'green', 'green accent-2', 'lime lighten-1', 'amber darken-1', 'orange lighten-1', 'orange darken-3', 'deep-orange lighten-2', 'blue-grey lighten-2']
  return colors[Math.round(Math.random() * colors.length)]
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
