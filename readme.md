Sequencing
==========

Sequencing is a generic middleware pattern for sequential operations.

### Install

```bash
npm install sequencing
```

### Example

```js
var seq = require('sequencing')();

seq.use(function (context, next) {
  console.log(context);         // {name: 'Julie'}
  next(null, {name: 'Jacob'});  // can change the context of the next middleware
});

seq.use(function (context, next) {
  console.log(context);         // {name: 'Jacob'}
  next(new Error('uh oh'), context);  // set error
});

seq.useOnError(function (err, context) {
  console.log(err);       // [Error: uh oh]
  console.log(context);   // {name: 'Jacob'}
});

seq.fire({ name: 'Julie' });
```