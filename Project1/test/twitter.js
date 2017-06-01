var twitter = require('../lib/twitter');
var assert = require('assert');

var users = {};

function random() {
  do {
    var name = 'random.name' + Math.floor(Math.random() * 100000);
  } while(users.hasOwnProperty(name));
  users[name] = true;
  return name;
}

describe('twitter', function() {
  var randomUser1;
  var randomUser2;
  var randomUser3;
  var randomUser4;

  beforeEach(function() {
    randomUser1 = random();
    randomUser2 = random();
    randomUser3 = random();
    randomUser4 = random();
  });

  describe('timeline()', function() {
    beforeEach(function() {
      twitter.signup(randomUser1);
      twitter.signup(randomUser2);
      twitter.signup(randomUser3);
      twitter.signup(randomUser4);
    });
    it('returns empty array if user has no tweets', function() {
      assert.deepEqual(twitter.timeline(randomUser1), []);
    });
    it('returns false on non-string username', function() {
      assert.equal(twitter.timeline(''), false);
      assert.equal(twitter.timeline(123), false);
      assert.equal(twitter.timeline(false), false);
      assert.equal(twitter.timeline([]), false);
    });
    it('adds tweet to timeline', function() {
      var tweet = twitter.tweet(randomUser1, 'Hello!');
      assert.deepEqual(twitter.timeline(randomUser1), [tweet]);
    });
    it('adds multiple tweets in the correct order', function() {
      var tweet1 = twitter.tweet(randomUser1, 'Hello!');
      var tweet2 = twitter.tweet(randomUser1, 'Hello Again!');
      assert.deepEqual(twitter.timeline(randomUser1), [tweet2, tweet1]);
    });
  });

  describe('signup()', function() {
    it('returns true when signing up a valid user', function() {
      assert.ok(twitter.signup(randomUser1));
    });
    it('follow() returns false if either user hasn\'t signed up', function() {
      twitter.signup(randomUser1);
      assert.equal(twitter.follow(randomUser1, randomUser2), false);
      twitter.signup(randomUser4);
      assert.equal(twitter.follow(randomUser3, randomUser4), false);
    });
    it('tweet() returns false if either user hasn\'t signed up', function() {
      assert.equal(twitter.tweet(randomUser1, 'Valid tweet'), false);
    });
    it('timeline() returns false if either user hasn\'t signed up', function() {
      assert.equal(twitter.timeline(randomUser1), false);
    });
    it('unfollow() returns false if either user hasn\'t signed up', function() {
      twitter.signup(randomUser1);
      assert.equal(twitter.unfollow(randomUser1, randomUser2), false);
      twitter.signup(randomUser4);
      assert.equal(twitter.unfollow(randomUser3, randomUser4), false);
    });
    it('returns false on invalid users', function() {
      assert.equal(twitter.signup(''), false);
      assert.equal(twitter.signup(123), false);
      assert.equal(twitter.signup(false), false);
      assert.equal(twitter.signup([]), false);
    });
  });

  describe('follow()', function() {
    beforeEach(function() {
      twitter.signup(randomUser1);
      twitter.signup(randomUser2);
      twitter.signup(randomUser3);
      twitter.signup(randomUser4);
    });
    it('returns true if following a new user', function() {
      assert.ok(twitter.follow(randomUser1, randomUser2));
    });
    it('returns false if following yourself', function() {
      assert.equal(twitter.follow(randomUser1, randomUser1), false);
    });
    it('returns false if following a user twice', function() {
      twitter.follow(randomUser1, randomUser2);
      assert.equal(twitter.follow(randomUser1, randomUser2), false);
    });
    it('does not return tweets from another user before following them', function() {
      twitter.tweet(randomUser1, 'Hello!');
      assert.deepEqual(twitter.timeline(randomUser2), []);
    });
    it('does not return past tweets when following', function() {
      twitter.tweet(randomUser1, 'You wont see this');
      twitter.follow(randomUser2, randomUser1);
      assert.deepEqual(twitter.timeline(randomUser2), []);
    });
    it('returns tweets from another user after following them', function() {
      twitter.follow(randomUser2, randomUser1);
      var tweet = twitter.tweet(randomUser1, 'Hello!');
      assert.deepEqual(twitter.timeline(randomUser2), [tweet]);
    });
    it('returns tweets from another user after multiple users follow them', function() {
      twitter.follow(randomUser2, randomUser1);
      twitter.follow(randomUser3, randomUser1);
      var tweet = twitter.tweet(randomUser1, 'Hello!');
      assert.deepEqual(twitter.timeline(randomUser2), [tweet]);
      assert.deepEqual(twitter.timeline(randomUser3), [tweet]);
    });
    it('returns tweets from multiple users after following them', function() {
      twitter.follow(randomUser1, randomUser2);
      twitter.follow(randomUser1, randomUser3);
      var tweet1 = twitter.tweet(randomUser2, 'I like Twitter');
      var tweet2 = twitter.tweet(randomUser3, 'So do I');
      var tweet3 = twitter.tweet(randomUser1, 'Meh');
      assert.deepEqual(twitter.timeline(randomUser1), [tweet3, tweet2, tweet1]);
    });
    it('returns false on non-string follower name', function() {
      assert.equal(twitter.follow('', randomUser2), false);
      assert.equal(twitter.follow(123, randomUser2), false);
      assert.equal(twitter.follow(false, randomUser2), false);
      assert.equal(twitter.follow([], randomUser2), false);
    });
    it('returns false on non-string followee name', function() {
      assert.equal(twitter.follow(randomUser1, ''), false);
      assert.equal(twitter.follow(randomUser1, 123), false);
      assert.equal(twitter.follow(randomUser1, false), false);
      assert.equal(twitter.follow(randomUser1, []), false);
    });
  });
  describe('unfollow()', function() {
    beforeEach(function() {
      twitter.signup(randomUser1);
      twitter.signup(randomUser2);
      twitter.signup(randomUser3);
      twitter.signup(randomUser4);
    });
    it('returns false if unfollowing yourself', function() {
      assert.equal(twitter.unfollow(randomUser1, randomUser1), false);
    });
    it('returns false if unfollowing a user not being followed', function() {
      assert.equal(twitter.unfollow(randomUser1, randomUser2), false);
    });
    it('returns true if unfollowing a user being followed', function() {
      twitter.follow(randomUser1, randomUser2);
      assert.ok(twitter.unfollow(randomUser1, randomUser2));
    });
    it('does not delete tweets after unfollowing a user', function() {
      twitter.follow(randomUser1, randomUser2);
      var tweet = twitter.tweet(randomUser2, 'Hello!');
      twitter.unfollow(randomUser1, randomUser2);
      assert.deepEqual(twitter.timeline(randomUser1), [tweet]);
    });
    it('does not return tweets after unfollowing a user', function() {
      twitter.follow(randomUser1, randomUser2);
      twitter.unfollow(randomUser1, randomUser2);
      twitter.tweet(randomUser2, 'Hello Again!');
      assert.deepEqual(twitter.timeline(randomUser1), []);
    });
    it('returns false on non-string follower name', function() {
      assert.equal(twitter.unfollow('', randomUser2), false);
      assert.equal(twitter.unfollow(123, randomUser2), false);
      assert.equal(twitter.unfollow(false, randomUser2), false);
      assert.equal(twitter.unfollow([], randomUser2), false);
    });
    it('returns false on non-string followee name', function() {
      assert.equal(twitter.unfollow(randomUser1, ''), false);
      assert.equal(twitter.unfollow(randomUser1, 123), false);
      assert.equal(twitter.unfollow(randomUser1, false), false);
      assert.equal(twitter.unfollow(randomUser1, []), false);
    });
  });
  describe('tweet()', function() {
    beforeEach(function() {
      twitter.signup(randomUser1);
      twitter.signup(randomUser2);
      twitter.signup(randomUser3);
      twitter.signup(randomUser4);
    });
    it('returns a tweet object with a valid ID', function() {
      var tweet = twitter.tweet(randomUser1, 'Hello!');
      assert.equal(typeof tweet.id, 'number');
      assert(tweet.id.toString().match(/[0-9]{6,}/));
    });
    it('returns a tweet object with a valid date', function() {
      var before = new Date();
      var tweet = twitter.tweet(randomUser1, 'Hello!');
      var after = new Date();

      assert.equal(typeof tweet.date, 'string');

      var date = new Date(tweet.date);
      assert.ok(date >= before && date <= after);
    });
    it('returns a tweet object with tweet content', function() {
      var tweet = twitter.tweet(randomUser1, 'Hello!');
      assert.equal(tweet.content, 'Hello!');
    });
    it('returns a tweet object with the correct username', function() {
      var tweet = twitter.tweet(randomUser1, 'Hello!');
      assert.equal(tweet.username, randomUser1);
    });
    it('returns a tweet object with retweet as false', function() {
      var tweet = twitter.tweet(randomUser1, 'Hello!');
      assert.strictEqual(tweet.retweet, false);
    });
    it('returns a tweet object with 0 favorites', function() {
      var tweet = twitter.tweet(randomUser1, 'Hello!');
      assert.strictEqual(tweet.favorites, 0);
    });
    it('returns false on non-string user', function() {
      assert.equal(twitter.tweet('', 'Oops'), false);
      assert.equal(twitter.tweet(123, 'Oops'), false);
      assert.equal(twitter.tweet(false, 'Oops'), false);
      assert.equal(twitter.tweet([], 'Oops'), false);
      assert.deepEqual(twitter.timeline(randomUser1), []);
    });
    it('returns false on non-string tweet', function() {
      assert.equal(twitter.tweet(randomUser1, ''), false);
      assert.equal(twitter.tweet(randomUser1, 123), false);
      assert.equal(twitter.tweet(randomUser1, false), false);
      assert.equal(twitter.tweet(randomUser1, []), false);
      assert.deepEqual(twitter.timeline(randomUser1), []);
    });
    it('returns false on tweets over 140 characters', function() {
      assert.equal(twitter.tweet(randomUser1, Array(142).join('a')), false);
      assert.deepEqual(twitter.timeline(randomUser1), []);
    });
  });
});
