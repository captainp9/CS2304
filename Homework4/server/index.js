var express = require('express');
var morgan = require('morgan');
var count = require('./count');
var app = express();

app.use(morgan('dev'));
app.use(express.static('./client'));

/*
 * Request handler for the GET /number HTTP endpoint. Returns the number of the
 * day in the response body.
 */
app.get('/number', function(req, res, next) {

  var number = count.numberOfTheDay();

  res.status(200).send(number.toString());
});

app.listen(3000);
