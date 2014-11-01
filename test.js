var seq = require('./');

describe('Sequencing', function () {
  it('should be a function', function () {
    seq.should.be.a.Function;
  });

  describe('#fire', function () {
    it('should be a function', function () {
      seq().fire.should.be.a.Function;
    });
  });

  describe('#use', function () {
    it('should throw if not given a function', function () {
      seq().use.should.throw();
    });

    it('should register middleware and invoke in order registered', function () {
      var test = seq();
      var context = {count: 0};

      test.use(function (cxt, next) {
        cxt.count++;
        cxt.count.should.equal(1);
        next(null, cxt);
      });

      test.use(function (cxt, next) {
        setTimeout(function () {
          cxt.count++;
          cxt.count.should.equal(2);
          next(null, cxt);
        }, 100);
      });

      test.use(function (cxt, next) {
        cxt.count++;
        cxt.count.should.equal(3);
        next(null, cxt);
      });

      test.fire(context);
    });
  });

  describe('#useOnError', function () {
    it('should throw if not given a function', function () {
      seq().useOnError.should.throw();
    });

    it('should invoke error handler when error is provided to #next', function () {
      var test = seq();
      var context = {count:0};

      test.use(function (cxt, next) {
        cxt.count++;
        next(new Error(), cxt);
      });

      test.use(function (cxt, next) {
        cxt.count++;  // shouldn't be called
        next(null, cxt);
      });

      test.useOnError(function (err, cxt) {
        cxt.count.should.equal(1);
        err.should.be.instanceOf(Error);
      });

      test.fire(context);
    });
  });
});