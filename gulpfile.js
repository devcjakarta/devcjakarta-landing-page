let gulp = require('gulp');
let critical = require('critical');

gulp.task('default', () => {
  critical.generate({
    base: 'build/',
    src: 'index.html',
    dest: 'index.html',
    minify: true,
    inline: true,
    dimensions: [{
      width: 1366,
      height: 768
    }, {
      width: 360,
      height: 640
    }],
    penthouse: {
      blockJSRequest: false
    }
  }).then(output => {
    console.log(output);
  }).error(err => {
    console.error(err);
  });
});
