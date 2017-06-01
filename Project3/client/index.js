function createUserLink(user) {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.textContent = user;
  a.href = '#';
  li.appendChild(a);
  return li;
}

function createUserLinks(users) {
  return users.map(createUserLink);
}

function clearInput(input) {
  input.value = '';
}

function replaceAllChildren(parent, newChildren) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  newChildren.forEach(function(newChild) {
    parent.appendChild(newChild);
  });
}

function isLink(element) {
  return element.nodeName === 'A';
}

window.addEventListener('load', function()
{
  var currentUser;
  var switchUserInput = document.getElementById('switch-user-input');
  var switchUserButton = document.getElementById('switch-user-button');
  var tweetInput = document.getElementById('tweet-input');
  var tweetButton = document.getElementById('tweet-button');
  var followInput = document.getElementById('follow-input');
  var followButton = document.getElementById('follow-button');
  var tweetList = document.getElementById('tweet-list');
  var followerList = document.getElementById('follower-list');
  var followingList = document.getElementById('following-list');
  var currentUserHeader = document.getElementById('current-user-header');

  function switchUserLinkEventHandler(e) {
    // Since we are using event bubbling, we have to ensure the target of the event was the a tag and not the li or ul parent tags.
    if(isLink(e.target)) {
      switchUser(e.target.textContent);
    }
  }

  function switchUserButtonEventHandler() {
    switchUser(switchUserInput.value);
    clearInput(switchUserInput);
  }

  function switchUser(username) {
    var req = new XMLHttpRequest();
    req.open('POST', '/users/' + username, true);
    req.addEventListener('load',function(){
      currentUser = JSON.parse(req.responseText);
      currentUserHeader.textContent = currentUser.username;
      replaceAllChildren(
      tweetList,
      createTweetElements(currentUser.timeline));

      replaceAllChildren(
      followerList,
      createUserLinks(currentUser.followers));

      replaceAllChildren(
      followingList,
      createUserLinks(currentUser.following));
    });
    req.send();

  }

  function followEventHandler() {
    var req = new XMLHttpRequest();
    req.open('POST', '/users/' + followInput.value, true);
    req.send();

    var req2 = new XMLHttpRequest();
    req2.open('POST', '/users/' +  currentUser.username + '/follow', true);
    req2.send(followInput.value);

    var req1 = new XMLHttpRequest();
    req1.open('GET', '/users/' +  followInput.value, true);
    req1.addEventListener('load',function(){
      var user = JSON.parse(req1.responseText);
      var link = createUserLink(user.username);
      followingList.appendChild(link);
      clearInput(followInput);
    });
    req1.send();
  }

  function tweetEventHandler() {
    var req = new XMLHttpRequest();
    req.open('POST', '/users/' +  currentUser.username + '/tweet', true);
    req.addEventListener('load',function(){
      var tweet = JSON.parse(req.responseText);
      var element = createTweetElement(tweet);
      tweetList.insertBefore(element, tweetList.childNodes[0]);
      clearInput(tweetInput);
    });
    req.send(tweetInput.value);
  }

  // Register event handlers
  switchUserButton.addEventListener('click', switchUserButtonEventHandler);
  followButton.addEventListener('click', followEventHandler);
  tweetButton.addEventListener('click', tweetEventHandler);

  followingList.addEventListener('click', switchUserLinkEventHandler);
  followerList.addEventListener('click', switchUserLinkEventHandler);

  function createTweetElements(timeline) {
    return timeline.map(createTweetElement);
  }

  function createTweetElement(timelineEntry) {
    var li = document.createElement('li');
    li.className = 'list-group-item tweet';

    var user = document.createElement('p');
    user.className = 'tweet-username';
    user.textContent = timelineEntry.username;
    li.appendChild(user);

    var content = document.createElement('p');
    content.className = 'tweet-content';
    content.textContent = timelineEntry.content;
    li.appendChild(content);

    var likebutton = document.createElement('button');
    likebutton.textContent = 'Like';
    li.appendChild(likebutton);
    var likeCount = document.createElement('p');
    likeCount.textContent = timelineEntry.favorites + ' like get! :)';
    li.appendChild(likeCount);
    likebutton.addEventListener('click', function(){
      var req = new XMLHttpRequest();
      req.open('POST', '/users/' +  timelineEntry.username + '/favorite', true);
      req.send(timelineEntry.id);

      var req2 = new XMLHttpRequest();
      req2.open('GET', '/users/' +  timelineEntry.username, true);
      req2.addEventListener('load', function(){
        var user = JSON.parse(req2.responseText);
        user.timeline.forEach(function(element){
          if (timelineEntry.id === element.id)
          {
            likeCount.textContent = element.favorites + ' like get! :)';
          }
        });
      });
      req2.send();
    });

    var unlikebutton = document.createElement('button');
    unlikebutton.textContent = 'Unlike';
    li.appendChild(unlikebutton);
    var unlikeCount = document.createElement('p');
    unlikeCount.textContent = timelineEntry.favorites + ' unlike get! :(';
    li.appendChild(unlikeCount);
    unlikebutton.addEventListener('click', function(){
      var req = new XMLHttpRequest();
      req.open('POST', '/users/' +  timelineEntry.username + '/unlike', true);
      req.send(timelineEntry.id);

      var req2 = new XMLHttpRequest();
      req2.open('GET', '/users/' +  timelineEntry.username, true);
      req2.addEventListener('load', function(){
        var user = JSON.parse(req2.responseText);
        user.timeline.forEach(function(element){
          if (timelineEntry.id === element.id)
          {
            unlikeCount.textContent = element.unlike + ' unlike get! :(';
          }
        });
      });
      req2.send();
    });

    var retweetbutton = document.createElement('button');
    retweetbutton.textContent = 'retweet';
    var checkretweet = document.createElement('p');
    checkretweet.textContent = 'Not been retweeted!';
    if (timelineEntry.retweet)
    {
      checkretweet.textContent = 'It has been retweeted!';
    }
    retweetbutton.addEventListener('click', function(){
      var req = new XMLHttpRequest();
      req.open('POST', '/users/' +  currentUser.username + '/retweet', true);
      req.send(timelineEntry.id);

      var req2 = new XMLHttpRequest();
      req2.open('GET', '/users/' +  currentUser.username, true);
      req2.addEventListener('load', function(){
        var user = JSON.parse(req2.responseText);
        var k = 1;
        user.timeline.forEach(function(element){
          if (timelineEntry.id === element.id&& k===1)
          {
            k = 2;
            element.retweet = true;
            var tweet = createTweetElement(element);
            tweetList.insertBefore(tweet, tweetList.childNodes[0]);

          }
        });
      });
      req2.send();
    });
    li.appendChild(retweetbutton);
    li.appendChild(checkretweet);

    return li;
  }
});
