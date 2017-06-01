var path = require('path');
var chromedriver = require('chromedriver');
var url = 'http://localhost:3000/index.html';

describe('count', function() {
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
    client
      .url(url)
      .pause(1000);
    done();
  });
  it('shows a random number', function(client) {
    client.getText('#number-of-the-day', function(result){
      client.assert.ok(result.value >= 0);
      client.assert.ok(result.value <= 20);
      client.assert.ok(Math.floor(parseFloat(result.value)) === parseFloat(result.value));
    }).pause(1000);
  });
});
