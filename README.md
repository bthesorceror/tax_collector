# Tax Collector

## Collecting all of the things

Collects all of the data on a stream and emits 'ready' when stream is finished

## Example

```javascript
var TaxCollector = require('tax_collector');

var stream = getSomeReadableStream();

var collector = new TaxCollector(stream);

collector.on('ready', function(text) {
  // Do something with text
});
```

## Notes

- 'error' event from stream is delegated
- encoding is set to utf8 by default, but options can be passed with an
  'encoding' key
