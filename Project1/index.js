var twitter = require('./lib/twitter');
global.timeline = twitter.timeline;
global.follow = twitter.follow;
global.unfollow = twitter.unfollow;
global.tweet = twitter.tweet;
global.signup = twitter.signup;

var repl = require('repl');
repl.start('twitter> ');
