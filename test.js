var fs        = require('fs'),
    tape      = require('tape'),
    Collector = require('./index');

(function() {
  tape("emits 'ready' event with data", function(t) {
    var collector = new Collector(fs.createReadStream('./test.txt'));
    t.plan(1);

    collector.on('ready', function(data) {
      t.equal(data, "I am the night\nI am Batman\n");
    });
  });
})();
