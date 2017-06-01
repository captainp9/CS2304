/*
* @module Twitter
* This module contains the business logic for twitter.
*/

/*
 * Global users object. Only available in this module in Node.js.
 */
var users = {};

/*
* Checks to ensure a value is a string and isn't an empty string.
*
* @param   {string} value   Value to perform validity check on.
* @return  {boolean}        True if valid, false if not.
*/
function isValidString(value) {
  return typeof value === 'string' && value !== '';
}

/*
* Returns whether or not a user is signed up already.
*
* @param   {string} user   The username of the user to signup.
* @return  {boolean}       True if signed up, false if not.
*/
function isSignedUp(user) {
  return users.hasOwnProperty(user);
}

/*
 * Object retpresentation of a twitter user including timeline, followers, and
 * following information.
 * @constructor
 */
function User(username) {
  this.username = username;
  this.timeline = [];
  this.followers = [];
  this.following = [];
}

/*
 * Follow a specific user.
 * @param {User} user User to follow.
 * @return {boolean}  True if successful, false if not.
 */
User.prototype.follow = function(user) {
  if(this === user) {
    return false;
  }
  if(this.following.indexOf(user) !== -1) {
    return false;
  }
  this.following.push(user);
  user.followers.push(this);
  return true;
}

/*
 * Unfollow a specific user.
 *
 * @param {User} user User to unfollow.
 * @return {boolean}  True if successful, false if not.
 */
User.prototype.unfollow = function(user) {
  if(this === user) {
    return false;
  }
  if(this.following.indexOf(user) === -1) {
    return false;
  }
  this.following = this.following.filter(function(following) {
    return following !== user;
  });
  user.followers = user.followers.filter(function(follower) {
    return follower !== this;
  }.bind(this));
  return true;
}

/*
 * Tweet the given content.
 *
 * @param {string} content  String content of the tweet.
 * @return {object}         Tweet object.
 */
User.prototype.tweet = function(content) {
  var tweetObject = {
    id: 100000 + Math.floor((Math.random() * 100000)),
    username: this.username,
    content: content,
    date: (new Date).toISOString(),
    retweet: false,
    favorites: 0,
    unlike: 0
  };

  this.timeline.unshift(tweetObject);
  this.followers.forEach(function(follower) {
    follower.timeline.unshift(tweetObject);
  });

  return tweetObject;
}

/*
* The signup function adds a new user to twitter. Users must be signed up
* before being used in any of the other functions.
*
* @param   {string} user    The user to signup.
* @return  {boolean}        True if succesful, false if not.
*/
function signup(user) {
  if(!isValidString(user) || isSignedUp(user)) {
    return false;
  }
  users[user] = new User(user);
  return true;
}

/*
 * The timeline function will return an array of tweets representing the
 * timeline for a given user.
 *
 * @param   {string} user   The user whose timeline to return.
 * @returns {[]|false}      Array of tweet objects representing the timeline
 *                          of the user. Alternatively, false will be returned
 *                          if the user is not a valid string.
 */
function timeline(user) {
  if(!isValidString(user) || !isSignedUp(user)) {
    return false;
  }

  return users[user].timeline;
}

/*
 * The follow function allows the follower to receive future tweets from the
 * user.
 *
 * @param   {string} follower The user requesting to follow the user.
 * @param   {string} user     The user being followed.
 * @returns {boolean}         Returns true if successfully followed and false
 *                            if not.
 */
function follow(follower, user) {
  if(!isValidString(follower) || !isSignedUp(follower)) {
    return false;
  }
  if(!isValidString(user) || !isSignedUp(user)) {
    return false;
  }
  return users[follower].follow(users[user]);
}

/*
 * The unfollow function is the inverse of {@link follow}. After unfollowing,
 * future tweets from user will not show up in follower's timeline.
 *
 * @param   {string} follower The user requesting to follow the user.
 * @param   {string} user     The user being followed.
 * @returns {boolean}         Returns true if successfully unfollowed and false
 *                            if not.
 */
function unfollow(follower, user) {
  if(!isValidString(follower) || !isSignedUp(follower)) {
    return false;
  }
  if(!isValidString(user) || !isSignedUp(user)) {
    return false;
  }
  return users[follower].unfollow(users[user]);
}

/*
 * This function will add a tweet for a given user. Tweeting will add a tweet
 * to each followers timeline, including the user doing the tweeting.
 *
 * @param   {string} user     The user tweeting.
 * @param   {string} content  The tweet content.
 * @returns {{}}|false}     Returns a tweet object or false in the case of a
 * failure.
 */
function tweet(user, content) {
  if(!isValidString(user) || !isSignedUp(user)) {
    return false;
  }
  if(!isValidString(content) || content.length > 140) {
    return false;
  }
  return users[user].tweet(content);
}

// New function just for project 3

/*
 * This function retrieves an enture user object.
 *
 * @param {string} user     Name of user to return.
 * @return {User|undefined} User object requested.
 */
function getUser(user) {
  return users[user];
}

// Functions to implement for project 3

/*
 * Retweet a specific tweet on a users timeline. All followers of the user
 * rewteeting will see this tweet.
 *
 * @param {string} user     User retweeting the tweet.
 * @param {number} tweetId  ID of the tweet.
 * @return {boolean}        True if successful, false if not. Can fail if user
 *                          does not exist or a tweet with that ID is not present
 *                          on a users timeline.
 */
function retweet(user, tweetId) {
  if(!isValidString(user) || !isSignedUp(user)) {
    return false;
  }
  users[user].timeline.forEach(function(element)
  {
    if (element.id === parseInt(tweetId))
    {
      var newTweet = element;
      newTweet.retweet = true;

      users[user].timeline.unshift(newTweet);
      users[user].followers.forEach(function(follower) {
        follower.timeline.unshift(newTweet);
      });
      return true;
    }
  });
  return false;
}

/*
 * Favorite a specific tweet.
 *
 * @param {string} user     User retweeting the tweet.
 * @param {number} tweetId  ID of the tweet.
 * @return {boolean}        True if successful, false if not. Can fail if user
 *                          does not exist or a tweet with that ID is not present
 *                          on a users timeline.
 */
function favorite(user, tweetId) {
  if(!isValidString(user) || !isSignedUp(user)) {
    return false;
  }
  users[user].timeline.forEach(function(element)
  {
    if (element.id === parseInt(tweetId))
    {
      element.favorites++;
      return true;
    }
  });
  return false;
}

function unlike(user, tweetId) {
  if(!isValidString(user) || !isSignedUp(user)) {
    return false;
  }
  users[user].timeline.forEach(function(element)
  {
    if (element.id === parseInt(tweetId))
    {
      element.unlike++;
      return true;
    }
  });
  return false;
}

/*
 * @exports Export the functions to allow access in tests.
 *
 * NOTE: Do not modify this block as it is required for testing. Understanding
 * how this works is not part of the project. If you wish to learn more, see
 * https://nodejs.org/api/modules.html
 */
module.exports = {
  signup: signup,
  timeline: timeline,
  follow: follow,
  unfollow: unfollow,
  tweet: tweet,
  getUser: getUser,
  favorite: favorite,
  retweet: retweet,
  unlike: unlike,
};
