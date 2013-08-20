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
    var collector = new Collector(fs.createReadStream('./test.txt'));
    test.plan(1);

    collector.on('ready', function(data) {
      test.equal(data, "I am the night\nI am Batman\n");
    });
  });

  tape("emits 'error' on stream error", function(test) {
    var readable = createReadable();
    var collector = new Collector(readable);

    test.plan(1);

    collector.on('error', function(error) {
      test.equals(error, 'this is a fine error');
    });

    readable.emit('error', 'this is a fine error');
  });

  tape("does not double emit 'ready' event", function(test) {
    var readable = createReadable();
    var collector = new Collector(readable);

    test.plan(1);

    collector.on('ready', function(error) {
      test.ok(true);
    });

    readable.emit('close');
    readable.emit('end');
  });

  tape("sets the default encoding", function(test) {
    var readable = createReadable();
    var collector = new Collector(readable);

    test.plan(1);

    test.equal(readable._encoding, 'utf8');
  });

  tape("sets the custom encoding", function(test) {
    var readable = createReadable();
    var collector = new Collector(readable, { encoding: 'russian' });

    test.plan(1);

    test.equal(readable._encoding, 'russian');
  });
})();
