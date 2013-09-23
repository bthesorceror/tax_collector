var fs           = require('fs');
var tape         = require('tape');
var EventEmitter = require('events').EventEmitter;
var Collector    = require('./index');

function createReadable() {
  var emitter = new EventEmitter();

  emitter.setEncoding = function(encoding) {
    this._encoding = encoding;
  }

  return emitter;
}

(function() {

  tape("emits 'ready' event with data", function(test) {

    var stream = fs.createReadStream('./test.txt');
    var collector = new Collector();

    stream.pipe(collector);

    test.plan(1);

    collector.on('ready', function(data) {
      test.equal(data, "I am the night\nI am Batman\n");
    });

  });

  tape("calls callback when done", function(test) {

    test.plan(1);

    var stream = fs.createReadStream('./test.txt');
    var collector = new Collector(function(data) {
      test.equal(data, "I am the night\nI am Batman\n");
    });

    stream.pipe(collector);

  });

  tape("acts as a passthrough", function(test) {

    var stream = fs.createReadStream('./test.txt');
    var collector1 = new Collector();
    var collector2 = new Collector();

    stream.pipe(collector1).pipe(collector2);

    test.plan(2);

    collector1.on('ready', function(data) {
      test.equal(data, "I am the night\nI am Batman\n");
    });

    collector2.on('ready', function(data) {
      test.equal(data, "I am the night\nI am Batman\n");
    });

  });
})();
