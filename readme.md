Sequencing
==========

Sequencing is a generic middleware pattern for sequential operations.

### Install

```bash
npm i sequencing
```

### Example

```js
const createSeq = require('sequencing')

const seq = createSeq()

// set up middleware logic

seq.use((context, next) => {
  console.log(context)           // {name: 'Julie'}
  next(null, { name: 'Jacob' })  // can change the context of the next middleware
})

seq.use((context, next) => {
  console.log(context)           // {name: 'Jacob'}
  next(new Error('uh oh'), context)  // set error
})

seq.useOnError((err, context) => {
  console.log(err)       // [Error: uh oh]
  console.log(context)   // {name: 'Jacob'}
})

// trigger an event for middleware to process

seq.fire({ name: 'Julie' })
```
