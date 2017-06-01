# Homework 1 - Setup, Editor, and Coding

The first homework assignment focuses on getting your machine setup and ready to do JavaScript programming. A very simple programming assignment follows this setup.

## Setup

A few prerequisites need to be setup in order to effectively complete each homework and project. The first homework is all about setting up those prerequisites.

* Read the [course overview and syllabus](https://github.com/VTCS2304/course-overview/blob/master/README.md).
* Install [Git](https://github.com/VTCS2304/course-overview/blob/master/Git.md) and spend some time getting acclimated.
* Install [Node.js](https://github.com/VTCS2304/course-overview/blob/master/Node.md) and spend some time getting acclimated.
* Install [Chrome](https://www.google.com/chrome/browser/desktop/) and get acclimated with the [browser developer tools](https://github.com/VTCS2304/course-overview/blob/master/DevTools.md).
* Install [Atom](https://github.com/VTCS2304/course-overview/blob/master/Atom.md).

Once complete, give yourself a pat on the back and relax for a few moments. Then start the coding assignment.

## Coding Assignment

This assignment focuses on using JavaScript's Number and String types to implement a very simple function. This function takes two parameters, we can assume they are numbers. The function simply returns the string "The sum is: X" where X is the sum of the numbers.

```javascript
function returnSum(a, b) {
  // Put Logic Here
}

// Test Logic
// The following should print "The sum is: 3" to the console.
console.log(returnSum(1,2));
```

Feel free to leave `console.log` statements in the file as it will not impact grading.

### Getting Started

1. Accept the [Github Classroom Invite](https://classroom.github.com/assignment-invitations/cceead9314c348b5f51c1489d1b27e86) for homework 1. This will create a copy of this repository that only you have access to view or edit.
1. Clone (download) your private copy of this repository. This can by done on the command line with the following commands, replacing `brianhartsock` with your Github username.

  ```
  $ git clone git@github.com:VTCS2304/homework1-brianhartsock.git
  $ cd homework1-brianhartsock
  ```

See the [cloning video](https://youtu.be/RXhjwPclwag) for additional guidance.

### Coding

The code for this homework is in `index.js`. Please edit this file and add the appropriate logic to the `returnSum` function.

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
