/*
* @module Twitter
* This module contains 6 functions which need to be implemented. Each function
* has comments defining the inputs and outputs of each function. Modify this
* file as needed to complete the assignemtn howver DO NOT modify the function
* signatures or the module.exports at the bottom of the file.
*/
var signupList = [];

/*
* @function
* @name signup
* The signup function adds a new user to twitter. Users must be signed up
* before being used in any of the other functions.
*
* @param   {string} user   The user to signup.
*/
function signup(user) {
  if (typeof user === 'string' && user && !signupList.includes(user)) // valid string && not in the sigh up list
  {
    // add to sign up list
    signupList.push(user);
    signupList[user] =
    {
      timeline: [],
      follower: []
    };
    return true;
  }
  return false;
}

/*
 * @function
 * @name timeline
 * The timeline function will return an array of tweets representing the
 * timeline for a given user.
 *
 * @param   {string} user   The user whose timeline to return.
 * @returns {[]|false}     Array of tweet objects representing the timeline
 * of the user. Alternatively, false will be returned if the user is not a
 * valid string.
 */
function timeline(user) {
  if (typeof user === 'string' && user && signupList.includes(user))
  {
    return signupList[user].timeline;
  }
  return false;
}

/*
 * @function
 * @name follow
 * The follow function allows the follower to receive future tweets from the
 * user.
 *
 * @param   {string} follower The user requesting to follow the user.
 * @param   {string} user     The user being followed.
 * @returns {boolean}         Returns true if successfully followed and false
 * if not.
 */
function follow(follower, user) {
  if (typeof follower === 'string' && follower && typeof user === 'string' && user
  && signupList.includes(user) && signupList.includes(follower) && follower !== user
  && !signupList[user].follower.includes(follower))
  {
    signupList[user].follower.push(follower);
    return true;
  }
  return false;
}

/* @function
 * @name unfollow
 * The unfollow function is the inverse of {@link follow}. After unfollowing,
 * future tweets from user will not show up in follower's timeline.
 *
 * @param   {string} follower The user requesting to follow the user.
 * @param   {string} user     The user being followed.
 * @returns {boolean}         Returns true if successfully unfollowed and false
 * if not.
 */
function unfollow(follower, user) {
  if (typeof follower === 'string' && follower && typeof user === 'string' && user
  && signupList.includes(user) && signupList.includes(follower) && follower !== user
  && signupList[user].follower.includes(follower))
  {
    var index = signupList[user].follower.indexOf(follower);
    signupList[user].follower.splice(index, 1);
    return true;
  }
  return false;

}

/*
 * @function
 * @name tweet
 * This function will add a tweet for a given user. Tweeting will add a tweet
 * to each followers timeline, including the user doing the tweeting.
 *
 * @param   {string} user     The user tweeting.
 * @param   {string} content  The tweet content.
 * @returns {{}}|false}     Returns a tweet object or false in the case of a
 * failure.
 */
function tweet(user, content) {
  // Implement logic here
  if (typeof user === 'string' && typeof content === 'string' && user
  && content && content.length <= 140 && signupList.includes(user))
  {
    var obj = {
      id:Math.round((Math.random()+1)*100000),
      content: content,
      username: user,
      date:new Date(Date.now()).toISOString(),
      retweet: false,
      favorites:0
    };
    signupList[user].timeline.unshift(obj);
    signupList[user].follower.forEach(function(element)
    {
      signupList[element].timeline.unshift(obj);
    });
    return obj;
  }
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
};
