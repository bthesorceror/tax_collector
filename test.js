var fs        = require('fs'),
    tape      = require('tape'),
    Collector = require('./index');

(function() {
  tape("emits 'ready' event with data", function(t) {
    var collector = new Collector();
    t.plan(1);

    collector.on('ready', function(data) {
      t.equal(data, "I am the night\nI am Batman\n");
    });

    collector.collect(fs.createReadStream('./test.txt'));
  });
})();
