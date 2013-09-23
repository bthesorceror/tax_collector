var Duplex = require('stream').Duplex;

function TaxCollector(callback, options) {
  if (typeof(callback) == 'function') {
    this.callback = callback;
  } else {
    options = callback;
  }
  Duplex.call(this, options);
  this.data = "";
}

(require('util')).inherits(TaxCollector, Duplex);

TaxCollector.prototype._write = function(chunk, encoding, next) {
  this.data += chunk;
  this.push(chunk);
  next();
}

TaxCollector.prototype._ready = function() {
  this.emit('ready', this.data);
  if (this.callback) {
    this.callback(this.data);
  }
}

TaxCollector.prototype._read = function() {}

TaxCollector.prototype.end = function(data) {
  var self = this;
  Duplex.prototype.end.apply(this, arguments);
  process.nextTick(function() {
    self._ready();
  });
  this.push(data);
}

module.exports = TaxCollector;
