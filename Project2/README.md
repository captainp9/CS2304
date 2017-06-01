# Project 2 (DUE 4/14/16)

In this project we will be using [project 1](https://github.com/VTCS2304/project1) logic to help us implement Twitter in a browser. The core logic remains unchanged for this project, we will instead focus on rendering the data into the DOM so it can be seen in a browser. This project only implements a client (browser) side component, no server side component. This means that data should be stored in memory and page refreshes will not persist data.

## Project Requirements

You must implement the user interface for viewing a users timeline, tweeting, following, and switching users. The logic for how these work is identical to first two projects, with the addition of switch user capabilities.

This project should be implemented entirely in JavaScript, HTML, and CSS. You are free to modify the HTML, CSS, and JavaScript provided as long as you preserve the required CSS selectors. The grading script will use these CSS selectors to automatically grade each project.

### Timeline, Followers, and Following

Viewing a user in the browser should show their name, timeline, followers, and following information should be shown for a user. Also, actions such as following or tweeting apply to the user being viewed.

The page can be initialized with any user on the initial page load. The tests will always switch users prior to executing any tests.

**Required CSS Selectors**

|Selector|Node|Example|
|--------|----|-------|
|`#current-user-header`|The header element which shows the current users name.|`<h2 id="current-user-header">brianhartsock</h2>`|
|`#tweet-list .tweet`|The node representing a tweet object.|`<ul id="tweet-list"><li class="tweet">...</li></ul>`|
|`#tweet-list .tweet .tweet-username`|The node representing the username of a tweet.|`<ul id="tweet-list"><li class="tweet"><p class="tweet-username">brianhartsock</p><li></ul>`|
|`#tweet-list .tweet .tweet-content`|The node representing the content of a tweet.|`<ul id="tweet-list"><li class="tweet"><p class="tweet-content">Looking forward to seeing you all complete project 2</p></li></ul>`|
|`#following-list a`|Links (`a` tags) that are children of the following list.|`<ul id="following-list"><li><a href="#">mary</a></li></ul>`|
|`#follower-list a`|Links (`a` tags) that are children of the follower list.|`<ul id="follower-ist"><li><a href="#">mary</a></li></ul>`|

### Switch User

Switch user is the only new piece of functionality for this project. It only applies to what user should be rendered. When switching users, the follower list, following list, tweet list, and username should change to the user being requested. The `signup` function from [project 1](https://github.com/VTCS2304/project1) should be used here to create the user if it does not exist.

There are two ways to switch users.

1. Enter the username into the switch user input and click on _Switch User_. After clicking the button, the input box should clear its value.
1. Click on the follower or following user names which are links.

**Required CSS Selectors**

|Selector|Node|Example|
|--------|----|-------|
|`input[type=text]#switch-user-input`|The switch user text box input.|`<input type="text" id="switch-user-input />`|
|`button#switch-user-button`|The switch user button|`<button id="switch-user-button">Switch User</button>`|
|`#following-list a`|Links (`a` tags) that are children of the following list.|`<ul id="following-list"><li><a href="#">mary</a></li></ul>`|
|`#follower-list a`|Links (`a` tags) that are children of the follower list.|`<ul id="follower-ist"><li><a href="#">mary</a></li></ul>`|

### Tweet

Tweeting behaves the same as tweeting on the previous project. Tweets will immediately show up on the current user's timeline. All followers of the current user will see the new tweet when switching to them. After clicking _Tweet_, the tweet input box should be cleared as well.

**Required CSS Selectors**

|Selector|Node|Example|
|--------|----|-------|
|`textarea#tweet-input`|The input textarea for tweet content.|`<textarea id="tweet-input" />`|
|`button#tweet-button`|The _Tweet_ button.|`<button id="tweet-button">Tweet</button>`|
|`#tweet-list .tweet`|The node representing a tweet object.|`<ul id="tweet-list"><li class="tweet">...</li></ul>`|
|`#tweet-list .tweet .tweet-username`|The node representing the username of a tweet.|`<ul id="tweet-list"><li class="tweet"><p class="tweet-username">brianhartsock</p><li></ul>`|
|`#tweet-list .tweet .tweet-content`|The node representing the content of a tweet.|`<ul id="tweet-list"><li class="tweet"><p class="tweet-content">Looking forward to seeing you all complete project 2</p></li></ul>`|

![tweeting](https://cloud.githubusercontent.com/assets/309711/13910219/ff48eab6-eef4-11e5-89a3-0bb0b95dccf9.gif)

### Follow

Following another user can be done by entering that user's name in the follow input. When done, the current user will start following the user they just entered. That username should show up in the following list immediately. After clicking _Follow_, the input box should be cleared.

To make testing easier, please call `signup` on the user being followed so that switching to that user first is unnecessary.

**Required CSS Selectors**

|Selector|Node|Example|
|--------|----|-------|
|`input[type=text]#follow-input`|The input textbox where the user being followed username is entered.|`<input type="text" id="follow-input" />`|
|`button#follow-button`|The _Follow_ button.|`<button id="follow-button">Follow</button>`|
|`#following-list a`|Links (`a` tags) that are children of the following list.|`<ul id="following-list"><li><a href="#">mary</a></li></ul>`|

![following](https://cloud.githubusercontent.com/assets/309711/13910148/fb247096-eef3-11e5-9204-bf60a231aef1.gif)

## Quick Lessons

There are a few things we haven't covered in class that are important to this project.

### Example Tweet HTML

The project is using [Twitter Bootstrap](http://getbootstrap.com) to make thing pretty (aka add a solid CSS foundation). To make your tweet objects look like the examples, simply make sure each one looks like this, with vary text content of course:

```html
<li class="list-group-item tweet">
  <p class="tweet-username">brian</p>
  <p class="tweet-content">hello world</p>
</li>
```

Multiple tweets in a list would look like:

```html
<ul id="tweet-list" class="list-group">
  <li class="list-group-item tweet">
    <p class="tweet-username">brian</p>
    <p class="tweet-content">hello mary</p>
  </li>
  <li class="list-group-item tweet">
    <p class="tweet-username">mary</p>
    <p class="tweet-content">hello world</p>
  </li>
</ul>
```

### CSS Selectors

[CSS selectors](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors) are the easiest way find specific elements in the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). They can get very complex but here is what you need to know for this project.

* `#following-list` - The `#` matches an element with a specific ID. This example would find the element with the ID `following-list`.
* `.tweet` - The `.` matches elements with the given class name. This example would find an element with the class `tweet`.
* `a` - Using a name with no qualifier means match elements with the given tag name. This example would match all links (`a` tags).
* `#following-list a` - Selectors can be chained. They are matched from left to right. In this example, we would be finding all links that are children of an element with the ID `following-list`.

### Multiple Files

In previous projects, a single code file has been required. This is not required in this project however. You can include multiple files if you so choose. The only requirement is that `index.html` is in the root of the project.

Using multiple files is easy. Simple add an additional `script` tag to `index.html`. Be careful to think about ordering and scope implications. Remember all files are in the global scope in the browser, meaning any functions or variables in the global scope in one file are available in the other file.

```html
<html>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <script src="twitter.js"></script>
    <script src="index.js"></script>
  <body>
    ...
  </body>
</html>
```

### Re-Using Code from Previous Projects

The logic in this project is identical to previous projects. It's possible to reuse some or all of your code with very little modification. There are a few things you must do in order to re-use your code.

1. Don't use `module.exports`. All included JavaScript files are executed in the same scope in a browser, and there is no built-in module system. Remove these lines at the bottom of project 1 or 2 to prevent an exception.
1. Follow the instructions [above](#Multiple-Files) to include an additional file in your project.

If you choose to re-use code from a previous project, I highly encourage you to avoid modifying this code. When building web applications, its important to separate business logic (or domain logic) from render logic. The past projects represent our business logic and this project represents our render logic. This enables easy testing of business logic which is important, because testing render logic is much more challenging.

## Grading Rubric
The following grading rubric will be used to grade the assignment.

|Functionality|Percentage of Grade|Notes|
|-------|-------------------|-----|
|Tests|70%|All the automated tests to validate behavior|
|4 pieces of flair|20%|See below|
|[Style guidelines](STYLE.md) are followed|10%|Half a point will be deducted for each violation.|

### Flair

This project adds a lot of new concepts. [Twitter Bootstrap](http://getbootstrap.com), CSS, browsers, and more. Take some time to experiment and add additional capabilities to the project. Some ideas:

* Style the page to make it look way better.
* Implement reweeting, favoriting, or unfollowing.
* Use [`window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to persist tweet information between page reloads.
* Add [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) when changing the DOM.
* Use [`window.history`](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to manipulate the URL.
* Add validation to input elements (i.e. not empty, less than 140 characters)

Flair can be almost anything. Flair should be documented in [`FLAIR.md`](FLAIR.md) and **each piece of flair must be at least 10 lines code**. Flair is what you make it. Ten lines of code is almost nothing and can be dded with almost no effort, but taking the time to learn something new is invaluable and will make you a better software developer.

<iframe src="https://player.vimeo.com/video/102830089" width="500" height="400" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Getting Started

1. Accept the [Github Classroom Invite](https://classroom.github.com/assignment-invitations/f7986e8164db6e25dd833c266f3f5e03). This will create a copy of this repository that only you have access to view or edit.
1. Clone (download) your private copy of this repository. This can by done on the command line with the following commands, replacing `brianhartsock` with your Github username.

  ```
  $ git clone https://github.com/VTCS2304/project2-brianhartsock.git
  $ cd project2-brianhartsock
  $ npm install
  ```

See the [cloning video](https://youtu.be/RXhjwPclwag) for additional guidance.

## Coding

Most of your coding will take place in the following files:

* [`index.html`](index.html) - The HTML page loaded in the browser.
* [`index.js`](index.js) - Where most of your JavaScript should go.

Please avoid coding JavaScript directly in `index.html`. That's typically considered a bad practice as the code isn't unit testable.

Anything in the [Javascript Standard Library](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) and [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) are fair game to use to complete the assignment. Node.js libraries and other 3rd party libraries, such as jQuery, are not needed and **should not be used**. The already provided modules in [`package.json`](package.json) are used for testing and are fine to include in your submission.

## Running the Application

Simply open `index.html` in a browser. One of the easiest ways to do this is to browse to the project folder on the command line.

**Mac OSX**
```bash
> open index.html
```

**Windows**
```bash
C:\project3> index.html
```

**Debian Linux Distros**
```bash
> sensible-browser index.html
```

## Tests

Tests execute in a browser for this assignment using [Selenium](http://www.seleniumhq.org). To run tests, just type `npm test` and Chrome will execute your tests. Also, `npm run test-slow` will run the tests slower to allow viewers to follow along more easily.

This time around, [style](STYLE.md) rules can be checked with [ESLint](http://eslint.org). Just run `npm run lint` to see a list of style violations.

## Submitting your assignment

Project will be submitted to your forks on Github via git. Simple run the following commands from the root of the project directory.

```
git add .
git commit -m "<Insert some commit message describing your changes>"
git push origin master
```
If you are comfortable with git, feel free to [commit](https://git-scm.com/docs/git-commit) frequently, use [branches](https://git-scm.com/docs/git-branch), and whatever else is helpful in successfully completing the project. Remember, versioning and backing up your code is **your responsibility**.

Note that `git add .` will add all files in the project directory to the submission. To selectively add files, just call `git add <filename>` for each file you wish to submit.

## Honor Code

This is an **individual project** and should not be done in a group. Do not plagiarize other students or online code to complete the assignment.

## Tips

* Use the [Javascript standard library documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference), especially for [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) and [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
* Use [Chrome developer tools](https://developer.chrome.com/devtools) to aid in Debugging.
* Don't wait until the last minute to complete this project.
