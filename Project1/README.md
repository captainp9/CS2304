# CS2304 Spring 2016 - Project 1 (DUE 2/23/17)

This project will build and command line version of twitter. The core problem is to build the data model and foundational business logic of a twitter like application. Users may view their timeline, tweet, follow other users, and unfollow them as well. Implementing these five functions, `signup`, `timeline`, `follow`, `unfollow`, and `tweet` in a command line application is your assignment.

The following represents an example interaction with the command line application.

```javascript
twitter> signup('bob')
true
twitter> signup('mary');
true
twitter> timeline('bob');
[]
twitter> follow('bob', 'mary');
true
twitter> tweet('mary', 'Hi Bob!');
true
twitter> timeline('bob');
[
  {
    id: 1028932,
    content: 'Hi Bob!',
    username: 'mary',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  }
]
twitter> timeline('mary');
[
  {
    id: 1028932,
    content: 'Hi Bob!',
    username: 'mary',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  }
]
twitter> unfollow('bob', 'mary');
true
twitter> tweet('mary', 'Goodbye Bob!');
true
twitter> timeline('bob');
[
  {
    id: 1028932,
    content: 'Hi Bob!',
    username: 'mary',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  }
]
twitter> timeline('mary');
[
  {
    id: 1209381,
    content: 'Goodbye Bob!',
    username: 'mary',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  },
  {
    id: 1028932,
    content: 'Hi Bob!',
    username: 'mary',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  }
]
```

The business rules are quite simple if you have used Twitter before. Users may view their timeline at any time. A timeline is comprised of tweets from the user and other users they are following. Timelines are ordered from newest tweet to oldest tweet. Put another way, when a users tweets, their timeline and the timelines of all their followers should be updated with that tweet, ordered from newest to oldest.

The tests used to grade the assignment have been given to you. Instructions for running the tests are listed below.

## Project Requirements

The detailed project requirements are listed below. There are a few commonalities between all the requirements.

- `user`, `content`, and `follower` parameters must be non-empty strings.
- Tweet objects from [homework2](https://github.com/VTCS2304/homework2) are returned from the `tweet` and `timeline` functions. Please reference the detailed documentation of tweet objects there.

### `signup(user)`

The signup function adds a new user to twitter. Users must be signed up before being used in any of the other functions.

The user must be a non-empty string. Signup should fail if the user has already signed up.

Function Parameters:
- `user` _String_ - The user to signup.

Return Value:
- `true` - Successfully signed up the user.
- `false` - Failed to sign up the user due to validation errors.

```javascript
> tweet('jill', 'where is jack?')
false
> signup('jill')
true
> tweet('jill', 'where is jack?')
{
  id: 8102312,
  content: 'where is jack?',
  username: 'jill',
  date: '2016-02-01T02:32:44.00Z',
  retweet: false,
  favorites: 0
}
> signup('jill')
false
> signup(123132)
false
```

### `tweet(user, content)`

The tweet function adds a tweet to the timeline of the user tweeting and all users following the tweeting user. Newer tweets should show up at the top or beginning of a timeline.

Users and tweets must be non-empty strings. Tweets must be less than 140 characters as well.

Function Parameters:
- `user` _String_ - The username that is tweeting.
- `content` _String_ - The actual tweet content.

Return Value:
- New Tweet object if successful.
- `false` if unsuccessful due to validation failures.

```javascript
> signup('brian')
true
> tweet('brian', 'Project 1 is in the books!');
{
  id: 801183,
  content: 'Project 1 is in the books!',
  username: 'brian',
  date: '2016-02-01T02:32:44.00Z',
  retweet: false,
  favorites: 0,
}
> tweet('', 'The username is invalid');
false
> tweet('brian', '');
false
```

### `follow(follower, user)`

The follow function adds the `follower` as a follower of `user`, meaning they will receive future tweets on their own timeline. Future is the operative word, previous tweets from `user` will not show up on `follower`'s timeline. Users must be non-empty strings and following the same user twice is not allowed. Users may not follow themselves.

Function Parameters:
- `follower` _String_ - The username of the user doing the following.
- `user` _String_ - The username of the user being followed.

Return Value:
- `true` if successful.
- `false` if unsuccessful, due to validation errors.

```javascript
> signup('jack')
true
> signup('jill')
true
> tweet('jack', 'Looking forward to running up that hill')
{
  id: 801183,
  content: 'Looking forward to running up that hill',
  username: 'jack',
  date: '2016-02-01T02:32:44.00Z',
  retweet: false,
  favorites: 0
}
> timeline('jill')
[]
> follow('jill', 'jack')
true
> timeline('jill')
[]
> tweet('jack', 'Ready to run up the hill Jill?')
{
  id: 801183,
  content: 'Ready to run up the hill Jill?',
  username: 'jack',
  date: '2016-02-01T02:32:44.00Z',
  retweet: false,
  favorites: 0
}
> timeline('jill')
[
  {
    id: 801183,
    content: 'Ready to run up the hill Jill?',
    username: 'jack',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  }
]
> follow('jill', 'jack')
false
> follow('jill', '')
false
> follow('', 'jack')
false
```

### `unfollow(follower, user)`

The unfollow function removes the `follower` as a follower of `user`, meaning they will no longer receive future tweets on their timeline. Previous tweets from `user` will not be removed from the `follower`'s timeline. Users must be non-empty strings and unfollowing a user that isn't being followed isn't allowed.

Function Parameters:
- `follower` _String_ - The username of the user doing the following.
- `user` _String_ - The username of the user being followed.

Return Value:
- `true` if successful at unfollowing.
- `false` if unsuccessful, due to validation errors.

```javascript
> signup('jack')
true
> signup('jill')
true
> follow('jill', 'jack')
true
> tweet('jack', 'Looking forward to running up that hill')
{
  id: 801183,
  content: 'Looking forward to running up that hill',
  username: 'jack',
  date: '2016-02-01T02:32:44.00Z',
  retweet: false,
  favorites: 0
}
> timeline('jill')
[
  {
    id: 801183,
    content: 'Looking forward to running up that hill',
    username: 'jack',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  }
]
> unfollow('jill', 'jack')
true
> tweet('jack', 'Ready to run up the hill Jill?')
{
  id: 801183,
  content: 'Ready to run up the hill Jill?',
  username: 'jack',
  date: '2016-02-01T02:32:44.00Z',
  retweet: false,
  favorites: 0
}
> timeline('jill')
[
  {
    id: 801183,
    content: 'Looking forward to running up that hill',
    username: 'jack',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  }
]
> unfollow('jill', 'jack')
false
> unfollow('jill', '')
false
> unfollow('', 'jack')
false
```

### `timeline(user)`

The timeline function returns an array of tweet objects representing a user's timeline. Each users timeline will be different and is based on their own tweets and the tweets of those they follow.

Function Parameters:
- `user` _String_ - The user requesting their timeline.

Return Value:
- Array of Tweet Objects

Examples:
```javascript
> signup('bob')
true
> signup('brian')
true
> follow('bob', 'brian')
true
> tweet('bob', 'CS2304 is my favorite class.')
{
  id: 192301,
  content: 'CS2304 is my favorite class.',
  username: 'bob',
  date: '2016-02-01T02:32:44.00Z',
  retweet: false,
  favorites: 0
}
> tweet('brian', 'The superbowl was amazing!')
{
  id: 801183,
  content: 'The superbowl was amazing!',
  username: 'brian',
  date: '2016-02-01T02:32:44.00Z',
  retweet: false,
  favorites: 0
}
> timeline('bob');
[
  {
    id: 801183,
    content: 'The superbowl was amazing!',
    username: 'brian',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  },
  {
    id: 192301,
    content: 'CS2304 is my favorite class.',
    username: 'bob',
    date: '2016-02-01T02:32:44.00Z',
    retweet: false,
    favorites: 0
  }
]
> timeline('')
false
```

## Grading Rubric
The following grading rubric will be used to grade the assignment.

|Functionality|Percentage of Grade|Notes|
|-------|-------------------|-----|
|Signup Tests|15%|Tests validating the signup of users.|
|Tweet Tests|15%|Tests validating the tweet behavior.|
|Timeline Tests|20%|Tests validating timeline behavior.|
|Follow Tests|20%|Tests validating following behavior.|
|Unfollow Tests|20%|Tests validating unfollowing behavior|
|[Style guidelines](STYLE.md) are followed|10%|Half a point will be deducted for each violation.|

## Getting Started

1. Accept the [Github Classroom Invite](https://classroom.github.com/assignment-invitations/94a56d021f20bf6ef76117380f2a0122). This will create a copy of this repository that only you have access to view or edit.
1. Clone (download) your private copy of this repository. This can by done on the command line with the following commands, replacing `brianhartsock` with your Github username.

  ```
  $ git clone https://github.com/VTCS2304/project1-brianhartsock.git
  $ cd project1-brianhartsock
  $ npm install
  ```

See the [cloning video](https://youtu.be/RXhjwPclwag) for additional guidance.

## Coding

All your work should go into [`lib/twitter.js`](lib/twitter.js). A file with the functions already stubbed out has been provided and are anxiously awaiting your implementation.

Anything in the [Javascript Standard Library](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) is fair game to use to complete the assignment. Node.js libraries and other 3rd party libraries are not needed and **should not be used**. The already provided modules in [`package.json`](package.json) are used for testing and are fine to include in your submission.

## Running the Application

The twitter application can be run in [Node.js interactively](https://nodejs.org/api/repl.html) by running `npm start`. This uses the [Node.js read-eval-print-loop](https://nodejs.org/api/repl.html), meaning it is executing each line being entered as Javascript. Simply type the function to execute with the parameters you want, and the return value will be printed.

_Tip: Type CTRL+C twice to exist the interactive shell_

## Tests

This project has all tests written to help you grade yourself. The tests are found in the [`test/twitter.js`](test/twitter.js) file. To run the tests, simply type `npm test`. Be sure you have ran `npm install` prior to running `npm test`.

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

## Tips

* Use the [Javascript standard library documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference), especially for [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) and [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
* Write additional helper functions as needed to reduce duplication and keep each function simple.
* `console.log` statements are helpful for debugging. Node.js does have a [debugger](https://nodejs.org/api/debugger.html), however it has a learning curve and likely isn't needed for this project.
