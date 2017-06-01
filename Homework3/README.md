# Homework 3 - Due 3/16

Homework 3 builds on [project 1](https://github.com/VTCS2304/project1) but adds two requirements.

- Create and use at least one prototype object.
- Use at least 2 "higher order" functions. These must either take a function as parameter or return a function from another function. Using array methods such as `forEach`, `map`, `filter`, `reduce` are examples of higher order functions you can use.

All tests should continue to pass. You are free to use the instructor solution to project 1 as a starting point, or your own code. If you already did this as part of project 1, you are free to resubmit the same code.

## Grading Rubric
The following grading rubric will be used to grade the assignment.

|Functionality|Percentage of Grade|Notes|
|-------|-------------------|-----|
|Prototype|50%|Use at least one prototype.|
|Higher Order Functions|25% Each|Tests validating the tweet behavior.|

## Getting Started

1. Accept the [Github Classroom Invite](https://classroom.github.com/assignment-invitations/8bc0f1dc6d93101ec88fc5ed54d0429a). This will create a copy of this repository that only you have access to view or edit.
1. Clone (download) your private copy of this repository. This can by done on the command line with the following commands, replacing `brianhartsock` with your Github username.

  ```
  $ git clone https://github.com/VTCS2304/homework3-brianhartsock.git
  $ cd homework3-brianhartsock
  $ npm install
  ```

See the [cloning video](https://youtu.be/RXhjwPclwag) for additional guidance.

## Coding

All your work should go into [`lib/twitter.js`](lib/twitter.js). A file with the functions already stubbed out has been provided and are anxiously awaiting your implementation.

Anything in the [Javascript Standard Library](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) is fair game to use to complete the assignment. Node.js libraries and other 3rd party libraries are not needed and **should not be used**. The already provided modules in [`package.json`](package.json) are used for testing and are fine to include in your submission.

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
