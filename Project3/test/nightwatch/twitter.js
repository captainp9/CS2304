var path = require('path');
var chromedriver = require('chromedriver');
var url = 'http://localhost:3000/index.html';

var users = {};
var delay = parseInt(process.env.DELAY || 500);

var users = {};

function switchUser(client, user) {
  return client
    .setValue('input[type=text]#switch-user-input', user)
    .pause(delay)
    .click('button#switch-user-button')
    .pause(delay)
}

function tweet(client, content) {
  return client
    .setValue('textarea#tweet-input', content)
    .pause(delay)
    .click('button#tweet-button')
    .pause(delay);
}

function follow(client, user) {
  return client
    .setValue('input[type=text]#follow-input', user)
    .pause(delay)
    .click('button#follow-button')
    .pause(delay);
};

function refresh(client, user) {
  client.refresh();
  return switchUser(client, user);
}

function random() {
  do {
    var name = 'random.name' + Math.floor(Math.random() * 10000000);
  } while(users.hasOwnProperty(name));
  users[name] = true;
  return name;
}

describe('twitter', function() {
  var randomUser1;
  var randomUser2;
  var randomUser3;
  var randomUser4;

  before(function(client, done) {
    chromedriver.start();
    done();
  });

  after(function(client, done) {
    client.end(function() {
      chromedriver.stop();
      done()
    });
  });

  beforeEach(function(client, done) {
    randomUser1 = random();
    randomUser2 = random();
    randomUser3 = random();
    randomUser4 = random();
    client
      .url(url);
    switchUser(client, randomUser1);
    done();
  });
  after(function(client, done) {
    client.end(function() {
      done()
    });
  });
  it('shows correct username', function(client) {
    client.expect.element('#current-user-header').text.to.equal(randomUser1);
  });
  it('shows no following on new user', function(client) {
    client.expect.element('#following-list a').not.to.be.present;
  });
  it('shows no followers on new user', function(client) {
    client.expect.element('#follower-list a').not.to.be.present;
  });
  it('shows no tweets on a new user', function(client) {
    client.expect.element('#tweet-list .tweet').not.to.be.present;
  });
  describe('switchUser()', function() {
    it('clears switch user input', function(client) {
      client.expect.element('input[type=text]#switch-user-input').to.have.value.that.equals('');
    });
    it('can switch users with following links', function(client) {
      follow(client, randomUser2);
      refresh(client, randomUser1);
      client.expect.element('#following-list a').to.be.present;
      client.click('#following-list a')
        .pause(delay)
        .expect.element('#current-user-header').text.to.equal(randomUser2);
    });
    it('can switch users with follower links', function(client) {
      follow(client, randomUser2);
      refresh(client, randomUser2);
      client.expect.element('#follower-list a').to.be.present;
      client.click('#follower-list a')
        .pause(delay)
        .expect.element('#current-user-header').text.to.equal(randomUser1);
    });
  });
  describe('follow()', function() {
    beforeEach(function(client, done) {
      follow(client, randomUser2);
      done();
    });
    it('clears follow input', function(client) {
      client.expect.element('input[type=text]#follow-input').to.have.value.that.equals('');
    });
    it('adds followed user to follower list', function(client) {
      refresh(client, randomUser1);
      client.expect.element('#following-list a').text.to.be.equal(randomUser2);
    });
    it('adds current user to following list of followed user', function(client) {
      refresh(client, randomUser2);
      client.expect.element('#follower-list a').text.to.be.equal(randomUser1);
    });
    it('returns tweets from another user after following them', function(client) {
      switchUser(client, randomUser2);
      tweet(client, 'Hello!');
      refresh(client, randomUser1);
      client.expect.element('#tweet-list .tweet .tweet-username').text.to.equal(randomUser2);
      client.expect.element('#tweet-list .tweet .tweet-content').text.to.equal('Hello!');
    });
    it('returns tweets from another user after multiple users follow them', function(client) {
      switchUser(client, randomUser3);
      follow(client, randomUser2);
      switchUser(client, randomUser2);
      tweet(client, 'Hello my multiple friends!');
      refresh(client, randomUser1);
      client.expect.element('#tweet-list .tweet .tweet-username').text.to.equal(randomUser2);
      client.expect.element('#tweet-list .tweet .tweet-content').text.to.equal('Hello my multiple friends!');
      refresh(client, randomUser3);
      client.expect.element('#tweet-list .tweet .tweet-username').text.to.equal(randomUser2);
      client.expect.element('#tweet-list .tweet .tweet-content').text.to.equal('Hello my multiple friends!');
    });
    it('returns tweets from multiple users after following them', function(client) {
      follow(client, randomUser3);
      switchUser(client, randomUser2);
      tweet(client, 'I like Twitter');
      switchUser(client, randomUser3);
      tweet(client, 'So do I');
      switchUser(client, randomUser1);
      tweet(client, 'Meh');
      refresh(client, randomUser1);
      client.expect.element('#tweet-list .tweet:nth-child(1) .tweet-username').text.to.equal(randomUser1);
      client.expect.element('#tweet-list .tweet:nth-child(1) .tweet-content').text.to.equal('Meh');
      client.expect.element('#tweet-list .tweet:nth-child(2) .tweet-username').text.to.equal(randomUser3);
      client.expect.element('#tweet-list .tweet:nth-child(2) .tweet-content').text.to.equal('So do I');
      client.expect.element('#tweet-list .tweet:nth-child(3) .tweet-username').text.to.equal(randomUser2);
      client.expect.element('#tweet-list .tweet:nth-child(3) .tweet-content').text.to.equal('I like Twitter');
    });
    it('does not return past tweets when following', function(client) {
      tweet(client, 'You won\'t see this');
      switchUser(client, randomUser2);
      follow(client, randomUser1)
      refresh(client, randomUser2);
      client.expect.element('#tweet-list .tweet').not.to.be.present;
    });
  });
  describe('tweet()', function() {
    it('clears input after tweeting', function(client) {
      tweet(client, 'a tweet');
      client.expect.element('textarea#tweet-input').to.have.value.that.equals('');
    });
    it('shows tweet on my own timeline', function(client) {
      tweet(client, 'This is my own tweet');
      refresh(client, randomUser1);
      client.expect.element('#tweet-list .tweet .tweet-content').text.to.equal('This is my own tweet');
      client.expect.element('#tweet-list .tweet .tweet-username').text.to.equal(randomUser1);
    });
    it('adds multiple tweets in the correct order', function(client) {
      tweet(client, 'My first tweet');
      switchUser(client, randomUser1);
      tweet(client, 'My second tweet');
      refresh(client, randomUser1);
      client.expect.element('#tweet-list .tweet:nth-child(1) .tweet-content').text.to.equal('My second tweet');
      client.expect.element('#tweet-list .tweet:nth-child(1) .tweet-username').text.to.equal(randomUser1);
      client.expect.element('#tweet-list .tweet:nth-child(2) .tweet-content').text.to.equal('My first tweet');
      client.expect.element('#tweet-list .tweet:nth-child(2) .tweet-username').text.to.equal(randomUser1);
    });
  });
});
