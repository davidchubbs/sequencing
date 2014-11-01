Sequencing
==========

Sequencing is a generic middleware pattern for sequential operations. Examples:

```js
var seq = require('sequencing')();

seq.use(function (context, next) {
  console.log(context);         // {name: 'Julie'}
  next(null, {name: 'Jacob'});  // can change the context of the next middleware
});

seq.use(function (context, next) {
  console.log(context);         // {name: 'Jacob'}
  next(new Error('uh oh'), {name: 'Jackson'});  // set error
});

seq.useOnError(function (err, context) {
  console.log(err);       // [Error: uh oh]
  console.log(context);   // {name: 'Jackson'}
});

seq.fire({ name: 'Julie' });
```