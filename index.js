module.exports = function () {
  var middleware = { first: null, last: null };
  var errHandler = null;

  /**
   * Subscribe middleware fn to `middleware` linked list.
   *
   * @function use
   * @param {function} middleware
   */
  function use (fn) {
    if (typeof fn !== 'function') {
      throw Error('#use is expecting a function');
    }

    fn.next = null;
    if (!middleware.first) {
      middleware.first = middleware.last = fn;
    } else {
      middleware.last.next = fn;
      middleware.last = fn;
    }
  }

  /**
   * Subscribe middleware for error-handling
   *
   * @function useOnError
   * @param {function} error-handler
   */
  function useOnError (fn) {
    if (typeof fn !== 'function') {
      throw Error('#useOnError is expecting a function');
    }
    errHandler = fn;
  }

  /**
   * Given context, fire middleware.
   *
   * @function fire
   * @param {mixed} context - initial middleware input
   */
  function fire (cxt) {
    if (middleware.first) {
      middleware.first(cxt, next.bind(null, middleware.first.next));
    }
  }

  /**
   * Signal that the next middleware can be fired
   *
   * @function next
   * @param {null|function} next-middleware, else null
   * @param {mixed} error - will stop middleware processing and
   *                        skip to errHandler
   * @param {mixed} output - will be passed in as input to next middleware
   */
  function next (cb, err, output) {
    if (err) {
      errHandler(err, output);
    } else if (cb) {
      cb(output, next.bind(null, cb.next));
    }
  }

  return {
    use: use,
    useOnError: useOnError,
    fire: fire
  };
};