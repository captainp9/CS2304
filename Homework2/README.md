# Homework 2 - Tweet

The projects for this class focus on building a minimal Twitter clone. Homework 2 builds one small piece of the first project, creating a tweet object. The goal of homework is to get basic familiarity with JavaScript types, documentation, control flow, and objects.

## Project Requirements

The following function documentation specify the requirements for the `tweet` function that will be implemented.

### `tweet(username, content)`

This tweet function will simply return a tweet object created based on the contents passed to `tweet`. `username` and `content` must be non-empty strings. In addition to that, `content` must be less than or equal to 140 characters.

Function Parameters:
- `username` _[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)_  - The username that is tweeting. **Required**
- `content` _[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)_  - The actual tweet content. **Required**

Return Value:
- New Tweet object if successful (defined below).
- `false` if unsuccessful due to validation failures.

```javascript
tweet('brian', 'Homework 2 is so easy!');
// Returns
// {
//   id: 801183,
//   content: 'Homework 2 is so easy!',
//   username: 'brian',
//   date: '2016-02-01T02:32:44.355Z',
//   retweet: false,
//   favorites: 0,
// }
tweet('', 'The username is invalid');
// Return false
tweet('brian', '');
// Returns false
```

A tweet object represents the content of a single tweet. It contains additional properties when compared to the first project's tweet object.

- `id` *[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)* - Random ID of the tweet generated each time `tweet` is called. Must be an integer greater than or equal to 100,000. *Hint: [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)*
- `content` [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - The string content of a tweet.
- `date` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)* - The current date when tweet was created in ISO string format. *Hint: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)*.
- `username` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)* - The username who tweeted the tweet.
- `retweet` *[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)* - Whether or not the tweet is a retweet. Should always be false for this homework.
- `favorites` *[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)* - The number of times this tweet has been favorited. Should always be 0 for this homework.

Example:
```javascript
{
  id: 930234,
  content: 'I hope you enjoy project 2 as much as I do!',
  username: 'brianhartsock',
  date: '2016-02-01T02:32:44.355Z',
  retweet: false,
  favorites: 0
}
```

## Grading Rubric

|Functionality|Percentage of Grade|Notes|
|-------------|-------------------|-----|
|Each tweet field|15%|Each tweet field that is returned correctly is worth 15 points.|
|Error Scenarios|10%|Handling the error scenarios listed is an additional 10% of the grade.|

### Getting Started

1. Accept the [Github Classroom Invite](https://classroom.github.com/assignment-invitations/e93331b0c98b7b463b03b813a7bea9af) for homework 2. This will create a copy of this repository that only you have access to view or edit.
1. Clone (download) your private copy of this repository. This can by done on the command line with the following commands, replacing `brianhartsock` with your Github username.

  ```
  $ git clone git@github.com:VTCS2304/homework2-brianhartsock.git
  $ cd homework2-brianhartsock
  ```

See the [cloning video](https://youtu.be/RXhjwPclwag) for additional guidance.

### Coding

The code for this homework is in `index.js`. Please edit this file and add the appropriate logic to the `tweet` function.

### Running the Application

Atom can run the code directly if the [script](https://atom.io/packages/script) package is installed by typing CMD+i on Mac or CTRL+i on Windows/Linux.

The code can also be run from the command line using [Node.js](https://github.com/VTCS2304/course-overview/blob/master/Node.md) directly.

```
$ node index.js
```

### Submitting your assignment

The homework will be submitted to your repository on [Github](https://github.com/VTCS2304/course-overview/blob/master/Github.md) via [Git](https://github.com/VTCS2304/course-overview/blob/master/Git.md). Simply run the following commands from the root of the homework directory.

```
git add index.js
git commit -m "<Insert some commit message describing your changes>"
git push origin master
```
See the [submitting video](https://youtu.be/GEgjVHFjG8c) for more information.
