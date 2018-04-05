let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
 
gulp.task('minify-css', () => {
  return gulp.src('./**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
      level: 2
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('babel-js', () => {
  return gulp.src(['./qmusic/script.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./qmusic/'))
});

gulp.task('minify-js', function (callback) {
  pump([
        gulp.src(['./**/*.js', '!./node_modules/**/*.js', '!./gulpfile.js', '!./todolist/src/*.js']),
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