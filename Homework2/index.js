
function tweet(username, tweet) {
  // Implement logic here
    if (username && tweet && tweet.length <= 140)
    {
      var obj = {
      id:Math.round((Math.random()+1)*100000),
      content: tweet,
      username: username,
      date:new Date(Date.now()).toISOString(),
      retweet: false,
      favorites:0
      };
      return obj;
    }
    return false;
}

// Test code
//console.log(tweet('user', 'My first tweet'));
