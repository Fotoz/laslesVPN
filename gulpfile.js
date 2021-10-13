//===== devDependencies:
const {
  src,
  dest,
  parallel,
  series
  }              = require('gulp'),
  gulp           = require('gulp'),
  browser_sync   = require('browser-sync').create(),
  file_include   = require('gulp-file-include'),
  del            = require('del'),
  sass           = require('gulp-sass')(require('sass')),
  cssbeautify    = require('gulp-cssbeautify'),
  autoprefixer   = require('gulp-autoprefixer'),
  group_media    = require('gulp-group-css-media-queries'),
  clean_css      = require('gulp-clean-css'),
  rename         = require('gulp-rename'),
  uglify         = require('gulp-uglify-es').default,
  imagemin       = require('gulp-imagemin'),
  webp           = require('gulp-webp'),
  webp_html      = require('gulp-webp-html'),
  webp_css       = require('gulp-webp-css'),
  svg_sprite     = require('gulp-svg-sprite'),
  ttf2woff       = require('gulp-ttf2woff'),
  ttf2woff2      = require('gulp-ttf2woff2');

//===== Paths:
const project_folder = 'dist',
      source_folder  = '_src';

const path = {
  build: {
    html:  project_folder + '/',
    css:   project_folder + '/css/',
    js:    project_folder + '/js/',
    img:   project_folder + '/img/',
    fonts: project_folder + '/fonts/'
  },
  src: {
    html:  source_folder + '/*.html',
    css:   source_folder + '/sass/main.sass',
    js:    source_folder + '/js/app.js',
    img:   source_folder + '/img/**/*.+(jpg|png|gif|ico|svg|webp)',
    fonts: source_folder + '/fonts/*.ttf'
  },
  watch: {
    html:  source_folder + '/**/*.html',
    css:   source_folder + '/sass/**/*.sass',
    js:    source_folder + '/js/**/*.js',
    img:   source_folder + '/img/**/*.+(jpg|png|gif|ico|svg|webp)'
  },
  clean: './' + project_folder + '/'
}

//===== Tasks:
function browserSync () {
  browser_sync.init({
    server: { baseDir: './' + project_folder + '/' },
    port:   3000,
    online: false,
    notify: false
  })
}

function html () {
  return src(path.src.html)
    .pipe( file_include({
      indent: true
    }) )
    .pipe( webp_html() )
    .pipe( dest(path.build.html) )
    .pipe( browser_sync.stream() )
}

function css () {
  return src(path.src.css)
    .pipe(
      sass().on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ['last 10 versions']
      })
    )
    .pipe( webp_css() )
    .pipe(
      cssbeautify({
        indent: '  ',
        openbrace: 'end-of-line',
        autosemicolon: true
      })
    )
    .pipe( group_media() )
    .pipe( rename('app.css') ) // uncompressed version
    .pipe( dest(path.build.css) )

    .pipe( clean_css() )
    .pipe( rename('app.min.css') )
    .pipe( dest(path.build.css) )
    .pipe( browser_sync.stream() )
}

function js () {
  return src(path.src.js)
    .pipe( file_include() )
    // .pipe( dest(path.build.js) ) // uncompressed version
    .pipe( uglify() )
    .pipe( rename('app.min.js') )
    .pipe( dest(path.build.js) )
    .pipe( browser_sync.stream() )
}

function images () {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70
      })
    )
    .pipe( dest(path.build.img) )

    .pipe( src(path.src.img) )
    .pipe(
      imagemin({
        progressive:       true,
        svgoPlugins:       [{ removeViewBox: false }],
        interlaces:        true,
        optimizationLevel: 3 // 0 to 7
      })
    )
    .pipe( dest(path.build.img) )
    .pipe( browser_sync.stream() )
}

gulp.task('svg_sprite', function () {
  return src([source_folder + '/img/iconsprite/*.svg']) // sprite file path
    .pipe(svg_sprite({
      mode: {
        stack: {
          sprite: '../icons/svg-sprite.svg', // sprite file name
          example: true
        }
      }
    }))
    .pipe( dest(path.build.img) )
})

function fonts () {
  src(path.src.fonts)
    .pipe( ttf2woff() )
    .pipe( dest(path.build.fonts) )
  return src(path.src.fonts)
    .pipe( ttf2woff2() )
    .pipe( dest(path.build.fonts) )
}

function watchFiles () {
  gulp.watch( [path.watch.html], html );
  gulp.watch( [path.watch.css], css );
  gulp.watch( [path.watch.js], js );
  gulp.watch( [path.watch.img], images );
}

function clean () {
  return del(path.clean);
}

const build = series(clean, parallel(html, css, js, images, fonts));
const watch = parallel(build, watchFiles, browserSync);



//===== Exports Tasks:
exports.html    = html;
exports.css     = css;
exports.js      = js;
exports.images  = images;
exports.fonts   = fonts;
exports.clean   = clean;
exports.build   = build;
exports.watch   = watch;
exports.default = watch;
