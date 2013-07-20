function TaxCollector(options) {
  options = options || {};
  this.encoding = options['encoding'] || 'utf8';
}

(require('util')).inherits(TaxCollector, (require('events').EventEmitter));

TaxCollector.prototype.collect = function(stream) {
  var data = "",
      self = this;

  var closed = function(d) {
    if (d) {
      data += d;
    }
    self.emit('ready', data);
  }

  stream.setEncoding(this.encoding);

  stream.on('data', function(d) {
    data += d;
  });

  stream.on('end', closed);
  stream.on('close', closed);
}

module.exports = TaxCollector;
