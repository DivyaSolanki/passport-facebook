var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var dbConfig = require('./db');
//var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views',path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({ 
 	secret: 'allthesecrettextgoeshere'/*,
 	saveUninitialized: false,
 	resave: false */
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
/* app.use('*', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}); */

/* if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.html', {
            message: err.message,
            error: err
        });
    });
} */

/* app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
}); */

module.exports = app;
