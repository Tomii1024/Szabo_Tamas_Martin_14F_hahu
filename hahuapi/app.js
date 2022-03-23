var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hahuRouter = require('./routes/hahu');

var mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/hahu';

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true})
    .then(console.log("Csatiztál"))
    .catch(err =>{
        console.log(err);
    });



    //git config --global user.email "you@example.com"
   //git config --global user.name "Your Name"
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/hahu', hahuRouter);

module.exports = app;
