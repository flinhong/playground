let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
const htmlmin = require('gulp-htmlmin');

 
gulp.task('minify-css', () => {
  return gulp.src('./**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
      level: 2
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('minify-js', function (callback) {
  pump([
        gulp.src(['./**/*.js', '!./gulpfile.js']),
        uglify(),
        gulp.dest('./')
    ],
    callback
  );
});

gulp.task('minify-html', function() {
  return gulp.src('./**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./'));
});