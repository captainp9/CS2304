var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var twitter = require('./twitter.js');

var app = express();
app.use(morgan('dev'));
app.use(express.static('./client'));
app.use(bodyParser.text());

/*
 * Serialize a user object to JSON. JSON serialization on circular references
 * will fail. We need to serialize the followers and following arrays of objects
 * into arrays of strings holding just the follower/ee name.
 *
 * @param {User} user User object to serialize.
 * @return {object}   User object without circular references.
 */
function serializeUser(user) {
  // JSON serialization on circular references will fail. We need to serialize
  // the followers and following arrays of objects into arrays of strings holding
  // just the follower/ee name.
  return {
    username: user.username,
    followers: user.followers.map(function(follower) { return follower.username; }),
    following: user.following.map(function(follows) { return follows.username; }),
    timeline: user.timeline
  };
}

/*
 * Signup user HTTP endpoint.
 */
app.post('/users/:user', function(req, res, next) {
  var username = req.params.user;
  twitter.signup(username);
  var user = twitter.getUser(username);

  res.status(200).json(serializeUser(user));
});

/*
 * Get User HTTP endpoint.
 */
app.get('/users/:user', function(req, res, next) {
  var username = req.params.user;
  var user = twitter.getUser(username);

  res.status(200).json(serializeUser(user));
});

/*
 * Follow user HTTP endpoint.
 */
app.post('/users/:user/follow', function(req, res, next) {
  var username = req.params.user;
  var follower = req.body;

  twitter.follow(username, follower);
  var user = twitter.getUser(username);

  res.status(200).json(serializeUser(user));
});

/*
 * Tweet HTTP endpoint.
 */
app.post('/users/:user/tweet', function(req, res, next) {
  var username = req.params.user;
  var content = req.body;

  var tweet = twitter.tweet(username, content);

  res.status(200).json(tweet);
});

/*
 * Favorite tweet HTTP endpoint.
 */
app.post('/users/:user/favorite', function(req, res, next) {
  var username = req.params.user;
  var tweetId = req.body;

  // Use twitter.favorite which will call server/twitter.js's favorite function.
  twitter.favorite(username, tweetId);
  var user = twitter.getUser(username);

  // Value to seralize to JSON and return.
  res.status(200).json(serializeUser(user));
});

app.post('/users/:user/unlike', function(req, res, next) {
  var username = req.params.user;
  var tweetId = req.body;

  // Use twitter.favorite which will call server/twitter.js's favorite function.
  twitter.unlike(username, tweetId);
  var user = twitter.getUser(username);

  // Value to seralize to JSON and return.
  res.status(200).json(serializeUser(user));
});
/*
 * Retweet HTTP endpoint.
 */
app.post('/users/:user/retweet', function(req, res, next) {
  var username = req.params.user;
  var tweetId = req.body;

  // Use twitter.retweet which will call server/twitter.js's retweet function.
  twitter.retweet(username, tweetId);
  var user = twitter.getUser(username);

  // Value to seralize to JSON and return.
  res.status(200).json(serializeUser(user));
});

app.listen(3000);
