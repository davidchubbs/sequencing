var gulp = require('gulp');
var mocha = require('gulp-mocha');
var should = require('should');

gulp.task('test', function () {
  return gulp.src('./test.js')
    .pipe(mocha({
      reporter: 'spec',
      globals: { should: should }
    }));
});

gulp.task('default', ['test']);