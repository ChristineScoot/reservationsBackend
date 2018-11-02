var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://kingarojk:kinga2103!@cluster0-shard-00-00-5ndv1.mongodb.net:27017,cluster0-shard-00-01-5ndv1.mongodb.net:27017,cluster0-shard-00-02-5ndv1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
// MongoClient.connect(uri, function(err, client) {
//     if(err){
//         console.log('Error occurred while connecting to mongodb atlas.. \n', err);
//     }
//     console.log('Connected...\n');
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb://kingarojk:@cluster0-shard-00-00-5ndv1.mongodb.net:27017,cluster0-shard-00-01-5ndv1.mongodb.net:27017,cluster0-shard-00-02-5ndv1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
const DATABASE_NAME = "Project0";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3010, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
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
