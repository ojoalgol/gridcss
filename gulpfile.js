// npm install --save-dev gulp gulp-postcss gulp-sourcemaps browser-sync autoprefixer postcss-cssnext postcss-nested postcss-mixins postcss-import csswring rucksack-css css-mqpacker gulp-file-include gulp-tinypng gulp-htmlmin critical gulp-clean-css
// npm install --global gulp-cli
// npm install --g postcss  

// Gulp *
var gulp = require('gulp')
// Uso de PostCSS *
var postcss = require('gulp-postcss')
// Reutilizar estilos de CSS *
var mixins = require('postcss-mixins')
// Importar archivos de CSS dentro de uno solo *
var atImport = require ('postcss-import')
// Extienden la sintaxis de CSS, la posibilidad de anidar clases *
var cssnested = require('postcss-nested')
// Para juntar media queries similares en una sola *
var mqpacker = require('css-mqpacker')
// Crear tamaños responsivos para las fuentes *
var rucksack = require('rucksack-css')
// Permite trabajar con parciales de HTML *
var fileinclude = require('gulp-file-include')
// Optimizar imágenes png y jpg *
var tinypng = require('gulp-tinypng')
// Minificar CSS *
var csswring = require('csswring')
// Minificar HTML *
var htmlmin = require('gulp-htmlmin')
// Inicializar critical css *
var critical = require('critical')
// Utilizar hoy la sintaxis CSS del mañana *
var cssnext = require('postcss-cssnext')
// Sincronizar navegador *
var browserSync = require('browser-sync').create()



// Servidor de desarrollo
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './docs'
    }
  })
});

// Tarea para procesar el CSS
gulp.task('css', function () {
  var processors = [
    mixins(),
    atImport(),
    cssnested,
    rucksack(),
    cssnext({browsers:'last 5 versions'}),
    mqpacker,
    csswring()
  ]
  return gulp.src('./src/css/app.min.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./docs/assets/css'))
    .pipe(browserSync.stream())
});

// Tarea para procesar JS
gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js') 
    .pipe(gulp.dest('./docs/assets/js'))
});

// Tarea para procesar imágenes
gulp.task('image', function() {
   return gulp.src('./src/img/**/*.*') 
   .pipe(gulp.dest('./docs/assets/img'))
});

// Tarea para procesar fuentes
gulp.task('fonts', function() {
   return gulp.src('./src/fonts/**/*.*') 
   .pipe(gulp.dest('./docs/assets/fonts'))
});

// Tarea para procesar videos y otros archivos de medios
gulp.task('medios', function() {
   return gulp.src('./src/media/**/*.*') 
   .pipe(gulp.dest('./docs/assets/media'))
});

// Tarea para utilizar fileinclude
gulp.task('fileinclude', function() {
  gulp.src('./src/*.html')
    .pipe(fileinclude({
      prefix: '@',
      basepath: './src'
    }))
    .pipe(gulp.dest('./pre-html'));
});


// Tarea para aplicar Critical CSS
gulp.task('critical', function (cb) {
  return critical.generate({
        base: './',
      inline: true,
        src: './pre-html/index.html',
        css: ['./docs/assets/css/app.min.css'],
        dimensions: [{
            width: 320,
            height: 480
        },{
            width: 768,
            height: 1024
        },{
            width: 1280,
            height: 960
        }, {
           width: 1920,
         height: 1080
      }],
        dest: './docs/index.html',
        minify: true,
        extract: false,
        ignore: ['font-face']
    });
});

// Tarea para minificar HTML
gulp.task('html', function() {
  return gulp.src('./pre-html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./docs'));
});


// Tarea para vigilar los cambios
gulp.task('watch', function () {
  gulp.watch('./src/css/*.css', ['css']).on('change', browserSync.reload)
  gulp.watch('./src/css/partials/*.css', ['css']).on('change', browserSync.reload)
  gulp.watch('./src/js/**/*.js', ['js']).on('change', browserSync.reload)
  gulp.watch('./src/img/**/*.*', ['image']).on('change', browserSync.reload)
  gulp.watch('./src/fonts/**/*.*', ['fonts']).on('change', browserSync.reload)
  gulp.watch('./src/media/**/*.*', ['medios']).on('change', browserSync.reload)
  gulp.watch('./src/**/*.html', ['fileinclude'])
  gulp.watch('./pre-html/*.html', ['html'])
  gulp.watch('./src/*.html', ['critical']).on('change', browserSync.reload)
  gulp.watch('./src/partials/*.html', ['critical']).on('change', browserSync.reload)
});

gulp.task('default', ['css', 'js', 'image', 'fonts', 'medios', 'fileinclude', 'html', 'critical', 'watch', 'serve'])