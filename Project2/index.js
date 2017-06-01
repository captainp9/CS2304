function switchUser(username)
{
  var currentUser = document.querySelector('#current-user-header');
  var followingList = document.querySelector('#following-list');
  var followerList = document.querySelector('#follower-list');
  var tweets = document.querySelector('#tweet-list');
  signup(username);
  currentUser.value = username;
  currentUser.innerText = username;

  if (typeof username === 'string' && username)
  {
    // update followingList
    while(followingList.firstChild)
    {
      followingList.removeChild(followingList.firstChild);
    }
    signupList[currentUser.value].following.forEach(function(element)
    {
      var li = document.createElement("li");
      var a = document.createElement('a');
      var text = document.createTextNode(element);
      a.appendChild(text);
      a.addEventListener('click', function(){
        switchUser(element);
      });
      li.appendChild(a);
      followingList.appendChild(li);
    });
    //update followerList
    while(followerList.firstChild)
    {
      followerList.removeChild(followerList.firstChild);
    }
    signupList[currentUser.value].follower.forEach(function(element)
    {
      var li = document.createElement("li");
      var a = document.createElement('a');
      var text = document.createTextNode(element);
      a.appendChild(text);
      a.addEventListener('click', function(){
        switchUser(element);
      });
      li.appendChild(a);
      followerList.appendChild(li);
    });
    //update timeline
    while(tweets.firstChild)
    {
      tweets.removeChild(tweets.firstChild);
    }
    signupList[currentUser.value].timeline.forEach(function(element)
    {
      var li = document.createElement("li");
      li.className = 'list-group-item tweet';
      var tweetUsername = document.createElement('p');
      tweetUsername.className = 'tweet-username';
      tweetUsername.textContent = element.username;
      var tweetContent = document.createElement('p');
      tweetContent.className = 'tweet-content';
      tweetContent.textContent = element.content;

      var likebutton = document.createElement('button');
      likebutton.textContent = 'Like';
      if(element.likelist.includes(currentUser.value))
      {
        likebutton.textContent = 'Liked!';
      }
      var likeCount = document.createElement('p');
      likeCount.textContent = element.favorites + ' people liked this!';
      var unlikebutton = document.createElement('button');
      unlikebutton.textContent = 'Unlike';

      likebutton.addEventListener('click',function(){
        if(likebutton.textContent === 'Like' && !element.likelist.includes(currentUser.value))
        {
          element.favorites++;
          element.likelist.push(currentUser.value);
          likeCount.textContent = element.favorites + ' people liked this!';
          likebutton.textContent = 'Liked!';
        }
        else {
          alert('You already liked this tweet!');
        }
      });

      unlikebutton.addEventListener('click',function(){
        if(likebutton.textContent === 'Liked!' && element.favorites > 0)
        {
          element.favorites--;
          var index = element.likelist.indexOf(currentUser.value);
          element.likelist.splice(index, 1);
          likeCount.textContent = element.favorites + ' people liked this!';
          likebutton.textContent = 'Like'
        }
      });
      li.appendChild(tweetUsername);
      li.appendChild(tweetContent);
      li.appendChild(likeCount);
      li.appendChild(likebutton);
      li.appendChild(unlikebutton);
      tweets.appendChild(li);
    });
  }
}


window.addEventListener('load', function() {
  var switchButton = document.querySelector('button#switch-user-button');
  var followButton = document.querySelector('button#follow-button');
  var unFollowButton = document.querySelector('button#unfollow-button');
  var followingList = document.querySelector('#following-list');
  var tweetButton = document.querySelector('button#tweet-button');

  // tweet button
  tweetButton.addEventListener('click',function(){
    var content = document.querySelector('textarea#tweet-input');
    var currentUser = document.querySelector('#current-user-header');
    var tweets = document.querySelector('#tweet-list');
    if(!currentUser.value)
    {
      alert('Please sign up first!');
    }
    else if(tweet(currentUser.value,content.value))
    {
      //update tweet list
      while(tweets.firstChild)
      {
        tweets.removeChild(tweets.firstChild);
      }
      signupList[currentUser.value].timeline.forEach(function(element)
      {
        var li = document.createElement("li");
        li.className = 'list-group-item tweet';
        var tweetUsername = document.createElement('p');
        tweetUsername.className = 'tweet-username';
        tweetUsername.textContent = element.username;
        var tweetContent = document.createElement('p');
        tweetContent.className = 'tweet-content';
        tweetContent.textContent = element.content;
        var likebutton = document.createElement('button');
        likebutton.textContent = 'Like';
        if(element.likelist.includes(currentUser.value))
        {
          likebutton.textContent = 'Liked!';
        }
        var unlikebutton = document.createElement('button');
        unlikebutton.textContent = 'Unlike';
        var likeCount = document.createElement('p');
        likeCount.textContent = element.favorites + ' people liked this!';

        likebutton.addEventListener('click',function(){
          if(likebutton.textContent === 'Like' && !element.likelist.includes(currentUser.value))
          {
            element.favorites++;
            element.likelist.push(currentUser.value);
            likeCount.textContent = element.favorites + ' people liked this!';
            likebutton.textContent = 'Liked!';
          }
          else {
            alert('You already liked this tweet!');
          }
        });

        unlikebutton.addEventListener('click',function(){
          if(likebutton.textContent === 'Liked!' && element.favorites > 0)
          {
            element.favorites--;
            var index = element.likelist.indexOf(currentUser.value);
            element.likelist.splice(index, 1);
            likeCount.textContent = element.favorites + ' people liked this!';
            likebutton.textContent = 'Like'
          }
        });

        li.appendChild(tweetUsername);
        li.appendChild(tweetContent);
        li.appendChild(likeCount);
        li.appendChild(likebutton);
        li.appendChild(unlikebutton);
        tweets.appendChild(li);
      });
    }
    else if(content.value.length > 140){
      alert('Tweet is longer than 140 characters!');
    }
    else if(content.value.length === 0)
    {
      alert('Tweet is empty!');
    }
    content.value = '';
  });

  // switch user button
  switchButton.addEventListener('click', function(){
    var username = document.querySelector('input[type=text]#switch-user-input');
    switchUser(username.value);
    username.value = '';  // clear the field;
  });

  // follow button
  followButton.addEventListener('click', function(){
    var currentUser = document.querySelector('#current-user-header');
    var followName = document.querySelector('input[type=text]#follow-input');
    signup(followName.value);
    if(follow(currentUser.value, followName.value))
    {
      while(followingList.firstChild)
      {
        followingList.removeChild(followingList.firstChild);
      }
      signupList[currentUser.value].following.forEach(function(element)
      {
        var li = document.createElement("li");
        var a = document.createElement('a');
        var text = document.createTextNode(element);
        a.appendChild(text);
        a.addEventListener('click', function(){
          switchUser(element);
        });
        li.appendChild(a);
        followingList.appendChild(li);
      });
    }
    else {
      alert('Please Enter a valid username!');

    }
    followName.value = '';
  });

  // unfollow button
  unFollowButton.addEventListener('click',function(){
    var currentUser = document.querySelector('#current-user-header');
    var unFollowName = document.querySelector('input[type=text]#follow-input');
    if(unfollow(currentUser.value, unFollowName.value))
    {
      while(followingList.firstChild)
      {
        followingList.removeChild(followingList.firstChild);
      }
      signupList[currentUser.value].following.forEach(function(element)
      {
        var li = document.createElement("li");
        var a = document.createElement('a');
        var text = document.createTextNode(element);
        a.appendChild(text);
        a.addEventListener('click', function(){
          switchUser(element);
        });
        li.appendChild(a);
        followingList.appendChild(li);
      });
    }
    else {
      alert('Please Enter a valid username!');

    }
    unFollowName.value = '';

  });
});
