var createError = require('http-errors');
import express from 'express'
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const favicon = require('express-favicon');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
require('dotenv').config();

var indexRouter = require('./routes/index');

var app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// Routes

app.use('/', indexRouter);

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

module.exports = app;
