# Homework 4 - Due 4/20/2017

Homework 4 is preparation for project 3. The goal of this homework is to connect a browser to a server using `XMLHttpRequest`'s. Remember Count from Sesame Street? He wants to build a web application that returns a different random number each time the page is loaded.

There are two primary tasks to complete this homework:
- Implement the server code to generate a random number.
- Implement the client code to request the random number from the server.

Most of the server code has been implemented for you using Express.

## Requirements

### Server

Implement the `numberOfTheDay` function in [`server/count.js`](server/count.js) to return a random positive integer between 0 and 20.

### Client

Use an `XMLHttpRequest` initiated at page load to retrieve the number from the server and populate the UI. This can be done in [`client/index.js`](client/index.js).

The endpoint of the server is as follows:

|Name|Method|URL|Request Body|Response Body|
|----|------|---|------------|-------------|
|Number|GET|`/number`|_None_|The number of the day as text|

The number of the day should be inserted as text into the element with the ID `number-of-the-day`. The CSS Selector `#number-of-the-day` can also be used.

## Grading Rubric
The following grading rubric will be used to grade the assignment.

|Functionality|Percentage of Grade|Notes|
|-------|-------------------|-----|
|Test|100%|The single test passes.|

The code will be checked to ensure `XMLHttpRequest`'s are used to retrieve the random number.

## Getting Started

1. Accept the [Github Classroom Invite](https://classroom.github.com/assignment-invitations/1b047afe02b0c2a72a5eef4e8feaf49c). This will create a copy of this repository that only you have access to view or edit.
1. Clone (download) your private copy of this repository. This can by done on the command line with the following commands, replacing `brianhartsock` with your Github username.

  ```
  $ git clone https://github.com/VTCS2304/homework3-brianhartsock.git
  $ cd homework4-brianhartsock
  $ npm install
  ```

See the [cloning video](https://youtu.be/RXhjwPclwag) for additional guidance.

## Coding

Most of your coding will take place in the following files:

* [`client/index.js`](client/index.js) - Client side JavaScript.
* [`server/count.js`](server/count.js) - Server side JavaScript business logic for number of the day.

There are a few other files completed for you that shouldn't need to be modified.

* [`client/index.html`](client/index.html) - The HTML page loaded in the browser.
* [`server/index.js`](server/index.js) - Server side JavaScript for Express request handlers.

Please avoid coding JavaScript directly in `index.html`. That's typically considered a bad practice as the code isn't unit testable.

Anything in the [Javascript Standard Library](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) is fair game to use to complete the assignment. Node.js libraries and other 3rd party libraries are not needed and **should not be used**. The already provided modules in [`package.json`](package.json) are used for testing and are fine to include in your submission.

## Running the Application

1. Run the web server

  ```bash
  npm start
  ```
1. Navigate to [`http://localhost:3000/index.html`](`http://localhost:3000/index.html`) in your browser.

## Tests

Tests execute in a browser for this assignment using [Selenium](http://www.seleniumhq.org). To run tests, just type `npm test` and Chrome will execute your tests. **Note that the web server must be running using `npm start` for the tests to work.**

## Submitting your assignment

The project will be submitted to your repository on [Github](https://github.com/VTCS2304/course-overview/blob/master/Github.md) via [Git](https://github.com/VTCS2304/course-overview/blob/master/Git.md). Simply run the following commands from the root of the homework directory.

```
git add lib/twitter.js
git commit -m "<Insert some commit message describing your changes>"
git push origin master
```

See the [submitting video](https://youtu.be/GEgjVHFjG8c) for more information.

## Honor Code

This is an **individual project** and should not be done in a group. Do not plagiarize other students or online code to complete the assignment.

In addition to the normal honor code rules, the following additional rules are in effect for your usage of Github.

* Do not add collaborators to your Github fork. This is audited in Github and will be visible to the instructor.
* Do not open pull requests for your work back into the main repository. This will allow all other students to see your work.

## Quick Lessons

There are a few key pieces to this project. Here is some additional, helpful lessons on those pieces.

### Express

[Express](http://expressjs.com) is a common web server used in Node. It uses middleware to handle requests and deliver responses to the browser. As with all things node and JavaScript, it is async.

Here is a brief overview of how express can be configured to handle web requests for those that are interested.

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
