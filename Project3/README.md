# Project 3 (DUE 5/9/17)

In this project we will bring together everything in [project 1](https://github.com/VTCS2304/project1) and [project 2](https://github.com/VTCS2304/project2). This project adds one final component, a web server, to the Twitter implementation. Adding a web server allows the state information (timelines, following information, etc) to persist across numerous browser sessions. The server should store state information in memory.

There are two main tasks for this project that you must do:
 - Use XMLHttpRequest's for signing up, tweeting, following, and retrieving a user.
 - Implement some flair - two of which have to be retweet and favorite.

Most of the server is implemented for you already using the solution code from project 1 / homework 3. You are also free to add additional libraries to this project if you choose. jQuery, React, Angular, etc are all fair game.

## Project Requirements

You must persist all state information on the server side. This includes a user's timeline, following, and follower information. Favoriting and retweeting will need to be saved on the server side as well. The logic of this project mirrors exactly the logic from project 2.

### Twitter Web Server

The web server is mostly completed for you. You are free to modify it however you see fit - as long as the tests pass. The only functions you will need to modify are the request handlers (in `server/index.js`) and business logic (in `server/twitter.js`) for retweet and favorite.

|Name|Method|URL|Request Body|Response Body|
|----|------|---|------------|-------------|
|Signup|POST|`/users/:user`|`null`|JSON serialized user object.|
|Tweet|POST|`/users/:user/tweet`|Tweet Content|JSON serialized tweet object.|
|Follow|POST|`/users/:user/follow`|Follower Name|JSON serialized user object.|
|Get User|GET|`/users/:user`|Get User|JSON serialized user object.|
|Retweet|POST|`/users/:user/retweet`|Tweet ID|_Left up to the implementor_|
|Favorite|POST|`/users/:user/favorite`|Tweet ID|_Left up to the implementor_|

### Timeline, Followers, and Following; Switch User; Tweet; Follow

See [project 2](https://github.com/VTCS2304/project2) for detailed information on these actions. The only difference between project 2 and this project is the browser will be refreshed to ensure the data is persisted to the server during tests.

Local storage is not allowed for storing user and tweet information to avoid server side coding.

### Retweet and Favorite Flair

Two pieces of required flair are retweet and favorite. They are flair and not _requirement_ because there is a lot of flexibility in how you implement them.

To retweet a tweet means to share it with all of your followers. For example, if Carlos follows Jackie and Jackie follows Carmen, when Carmen tweets only Jackie will see it. If Jackie retweets Carmen's tweet, then Carlos would now see Carmen's tweet.

Favoriting is effectively a counter of "favorites" on a given tweet. When a user favorites the tweet, that counter should increase.

Unlike previous projects, retweet and favoriting don't have tests and you are free to implement them however you see fit. There will be questions like "can a user favorite something more than once" and that is up to you to decide. I will be looking at the code and ensuring the basic rules are followed, but want you to be free to improvise on the UI, server, and business rules.

In order to get credit for retweet and favorite:
- There must be an action on the page that can be clicked to retweet or favorite a tweet.
- There must be some visual indication on the page of where a tweet has is retweeted and the favorite count.
- Favorite and retweet information must be persisted to the server.
- Basic information about how the rules of tweet and favorite should be documented in [`FLAIR.md`](FLAIR.md).

In summary, if I can retweet or favorite something and see that it changes the page and is saved, you will get full credit. Have some fun playing around with different approaches to the UI, server, and business logic.

### Additional Flair

Two additional pieces of flair are required in addition to retweeting and favoriting. You are free to reuse the flair from project 2 if you choose, but I encourage you try some new ideas.

Even more new concepts are added to this project. Take some time to experiment. Some possible pieces of flair are:

* Return server side errors if disallowed actions are performed.
* Persist data to disk.
* Style the page to make it look way better.
* Implement additional functionality like unfollow, blocking, etc.
* Try using jQuery to implement the assignment.
* Add [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) when changing the DOM.
* Use [`window.history`](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to manipulate the URL.
* Add validation to input elements (i.e. not empty, less than 140 characters)

Flair can be almost anything. Flair should be documented in [`FLAIR.md`](FLAIR.md) and **each piece of flair must be at least 10 lines code**. Flair is what you make it. Ten lines of code is almost nothing and can be dded with almost no effort, but taking the time to learn something new is invaluable and will make you a better software developer.

<iframe src="https://player.vimeo.com/video/102830089" width="500" height="400" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Grading Rubric
The following grading rubric will be used to grade the assignment.

|Functionality|Percentage of Grade|Notes|
|-------|-------------------|-----|
|Tests|60%|All the automated tests to validate behavior|
|Retweet and favorite flair|20%|The required flair for the project.|
|2 additional pieces of flair|10%|Two additional pieces of flair.|
|[Style guidelines](STYLE.md) are followed|10%|Half a point will be deducted for each violation.|

## Getting Started

1. Accept the [Github Classroom Invite](https://classroom.github.com/assignment-invitations/5c97bf6778ee59a6ce07af45bc6085d1). This will create a copy of this repository that only you have access to view or edit.
1. Clone (download) your private copy of this repository. This can by done on the command line with the following commands, replacing `brianhartsock` with your Github username.

  ```
  $ git clone https://github.com/VTCS2304/project3-brianhartsock.git
  $ cd project3-brianhartsock
  $ npm install
  ```

See the [cloning video](https://youtu.be/RXhjwPclwag) for additional guidance.

## Coding

Most of your coding will take place in the following files:

* [`client/index.html`](client/index.html) - The HTML page loaded in the browser.
* [`client/index.js`](client/index.js) - Client side JavaScript.
* [`server/index.js`](server/index.js) - Node.js web server.
* [`server/twitter.js`](server/twitter.js) - Server side twitter business logic.

Please avoid coding JavaScript directly in `index.html`. That's typically considered a bad practice as the code isn't unit testable.

Anything in the [Javascript Standard Library](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) and Web APIs are fair game to use to complete the assignment. **Node.js libraries and other open source libraries are fair game for this project!** Feel free to use any library you so choose as long as it is open source and not plagiarizing other students work.

## Running the Application

1. Run the web server

  ```bash
  npm start
  ```
1. Navigate to `http://localhost:3000/index.html` in your browser.

## Tests

Tests execute in a browser for this assignment using [Selenium](http://www.seleniumhq.org). To run tests, just type `npm test` and Chrome will execute your tests. Note that the web server must be running.

[Style](STYLE.md) rules can be checked with [ESLint](http://eslint.org). Just run `npm run lint` to see a list of style violations.

**Note - Tests may become fragile after numerous tests runs due to naming conflicts. Restart the web server every now and again to prevent issues.**

## Submitting your assignment

The project will be submitted to your repository on [Github](https://github.com/VTCS2304/course-overview/blob/master/Github.md) via [Git](https://github.com/VTCS2304/course-overview/blob/master/Git.md). Simply run the following commands from the root of the homework directory.

```
git add .
git commit -m "<Insert some commit message describing your changes>"
git push origin master
```

See the [submitting video](https://youtu.be/GEgjVHFjG8c) for more information.

## Honor Code

This is an **individual project** and should not be done in a group. Do not plagiarize other students or online code to complete the assignment.

## Quick Lessons

There are a few key pieces to this project. Here is some additional, helpful lessons on those pieces.

### Express

[Express](http://expressjs.com) is a common web server used in Node. It uses middleware to handle requests and deliver responses to the browser. As with all things node and JavaScript, it is async.

Here is a brief overview of how express can be configured to handle web requests relevant to this project. Most all of the configuration

```javascript
// Respond to a GET to /url with a 200 (success) signal and no data.
app.get('/url', function(req, res, next) {
  res.sendStatus(200);
});

// Respond to a GET to /url with a 200 (success) signal and JSON
// data.
app.get('/url', function(req, res, next) {
  res
    .send(200)
    .json({
      username: 'brian'
    });
});

// Responding to a GET with a variable URL like /users/<username>.
app.get('/users/:user', function(req, res, next) {
  var user = req.params.user;
  res
    .send(200)
    .json({
      username: user
    });
});

// Responding to a GET with a query parameter like /url?user=brian
app.get('/url', function(req, res, next) {
  var user = req.query.user;
  res
    .send(200)
    .json({
      username: user
    });
});

// Handling text data in the body of a POST request. Remember, everything
// will be a string so any numbers passed will need to be converted to a
// number with parseInt()
app.post('/url',
  function(req, res, next) {
    var textData = req.body;
    res.sendStatus(200);
  });

// Handling JSON data in the body of a POST request.
app.post('/url',
  bodyParser.json(),
  function(req, res, next) {
    var jsonData = req.body;
    res.sendStatus(200);
  });
```

The code in [`server/index.js`](server/index.js) is stubbed out with one possible (albeit incomplete) implementation of the web request handlers. Feel free to use this implementation or modify it to your choosing.

### JSON Serialization

It's very easy to turn an object into JSON and vice versa:
- `JSON.parse(string)` - String to deserialize into an object.
- `JSON.stringify(object)` - Object to serialize into a string.

Circular references (user object Bob references user object Mary and vice versa) can't be serialized. If this happens to you, remember the browser doesn't need the entire data model. The browser just needs the raw information necessary to render. For example, to view a single user, the browser only needs:

- The username of the user being viewed
- Array of strings representing following usernames
- Array of strings representing follower usernames
- Array of tweet objects with a string content, string username, integer favorite, and boolean retweet property.

### Project 2 Lessons

See [project 2](https://github.com/VTCS2304/project2) for more quick lessons.
