function TaxCollector(options) {
  options = options || {};
  this.encoding = options['encoding'] || 'utf8';
}

(require('util')).inherits(TaxCollector, (require('events').EventEmitter));

TaxCollector.prototype.collect = function(stream) {
  var data = "",
      self = this;

  var finished = false;

  var closed = function(d) {
    if (finished) return;
    if (d) {
      data += d;
    }
    self.emit('ready', data);
    finished = true
  }

  var error = function(err) {
    self.emit('failed', err, data);
    finished = true;
  }

  stream.setEncoding(this.encoding);

  stream.on('data', function(d) {
    data += d;
  });

  stream.on('end', closed);
  stream.on('close', closed);
  stream.on('error', error);
}

module.exports = TaxCollector;
