var gulp = require('gulp')
var postcss = require('gulp-postcss')
var mixins = require('postcss-mixins')
var atImport = require ('postcss-import')
var cssnested = require('postcss-nested')
var mqpacker = require('css-mqpacker')
var rucksack = require('rucksack-css')
var fileinclude = require('gulp-file-include')
var csswring = require('csswring')
var cssnext = require('postcss-cssnext')
var browserSync = require('browser-sync').create()

// Servidor de desarrollo
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './docs'
    }
  })
})

// Tarea para procesar el CSS
gulp.task('css', function () {
  var processors = [
    mixins(),
    atImport(),
    cssnested,
    rucksack(),
    cssnext({browsers:'last 5 versions'}),
    mqpacker,
    //csswring()
  ]
  return gulp.src('./src/css/app.min.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./docs/assets/css'))
    .pipe(browserSync.stream())
})

// Tarea para utilizar fileinclude
gulp.task('fileinclude', function() {
  gulp.src('./src/*.html')
    .pipe(fileinclude({
      prefix: '@',
      basepath: './src'
    }))
    .pipe(gulp.dest('./docs'));
});


// Tarea para vigilar los cambios
gulp.task('watch', function () {
  gulp.watch('./src/css/*.css', ['css']).on('change', browserSync.reload)
  gulp.watch('./src/css/partials/*.css', ['css']).on('change', browserSync.reload)
  gulp.watch('./src/*.html', ['fileinclude']).on('change', browserSync.reload)
  gulp.watch('./src/partials/*.html', ['fileinclude']).on('change', browserSync.reload)
})

gulp.task('default', ['watch', 'fileinclude', 'css', 'serve'])