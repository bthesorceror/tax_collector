function TaxCollector(stream, options) {
  options = options || {};
  this.isFinished = false;
  this.encoding = options['encoding'] || 'utf8';
  this.setupStreamEvents(stream);
  this.data = "";
}

(require('util')).inherits(TaxCollector, (require('events').EventEmitter));

TaxCollector.prototype.setupStreamEvents = function(stream) {
  stream.setEncoding(this.encoding);
  stream.on('data', this.onData.bind(this));
  stream.on('end', this.finished.bind(this));
  stream.on('close', this.finished.bind(this));
}

TaxCollector.prototype.onData = function(data) {
  this.data += data;
}

TaxCollector.prototype.finished = function(data) {
  if (this.isFinished) return;
  data && this.onData(data);
  process.nextTick(function() {
    this.emit('ready', this.data);
  }.bind(this));
  this.isFinished = true
}

module.exports = TaxCollector;
