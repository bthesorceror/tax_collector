# Tax Collector

[![Build Status](https://travis-ci.org/bthesorceror/tax_collector.png)](https://travis-ci.org/bthesorceror/tax_collector)

## Collecting all of the things

Collects all of the data on a stream and emits 'ready' when stream is finished

## Example

```javascript
var TaxCollector = require('tax_collector');

var stream = getSomeReadableStream();

var collector = new TaxCollector();

stream.pipe(collector);

collector.on('ready', function(text) {
  // Do something with text
});
```
