var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var entertainRouter = require('./routes/entertains');
const movies = require('./routes/movies')
const cors = require('cors');
const fs = require('fs')

//graphql
const {graphqlExpress,graphiqlExpress} = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = fs.readFileSync('./grapql/typeDefs/orkestrator.gql', 'utf-8')
const resolvers = require('./grapql/resolvers/orkestrator.resolver')
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
// console.log(schema)
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


app.use('/entertainme', entertainRouter);
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))


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
