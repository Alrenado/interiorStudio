// gulp
import gulp from 'gulp';
import debug from 'gulp-debug';
import flatten from 'gulp-flatten'; // Remove or replace relative path for files

//html
import htmlMin from 'gulp-htmlmin';

//css
//scss
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";

// live coding
import serveStatic from 'serve-static';
import browserSync from 'browser-sync';

// js
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

// img
import svgSprite from 'gulp-svg-sprite';
import webp from 'gulp-webp';
import avif from './gulp/gulp-avif.js'

// clear files
import {deleteAsync as del} from 'del';

// include file
import fileInclude from 'gulp-file-include';

// fonts
import gulpIf from 'gulp-if';
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";

const paths = {
    build: {
        html: './dist/',
        css: './dist/css',
        js: './dist/js',
        img: './dist/img',
        fonts: './dist/fonts',
        libs: './dist/libs',
    },

    src: {
        html: './src/*.html',
        css: './src/scss/*.scss',
        js: './src/js/script.js',
        img: './src/img/**/*.{jpg,jpeg,png,gif,webp,ico}',
        fonts: './src/fonts/*.ttf',
        libs: './src/libs/**/*.*',
    },

    watch: {
        html: './src/**/*.html',
        css: './src/scss/**/*.scss',
        js: './src/js/**/*.js',
        img: './src/img/**/*.{jpg,jpeg,png,gif,webp,ico,svg}',
        fonts: './src/fonts//*.*',
        libs: './src/libs/**/*.*',
    },
}

function js() {
    return gulp
        .src(paths.src.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.js))
        .pipe(browserSync.stream());
}

function style() {
    return gulp
        .src('./src/scss/pages/**/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.stream());
}

function libs() {
    return gulp
        .src(paths.src.libs)
        .pipe(gulp.dest(paths.build.libs))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src([
        './src/html/pages/**/index.html',
        './src/html/pages/*.html'
    ], {
        base: './src/html/pages'
    })
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(rename(file => {
            const pageName = file.basename === 'index'
                ? file.dirname
                : file.basename;
            file.dirname  = '';
            file.basename = pageName;
        }))
        .pipe(htmlMin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            sortClassName: true,
            sortAttributes: true,
            removeComments: true,
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
}



function webpBuild() {
    return gulp
        .src('./src/img/**/*.{jpg,jpeg,png}')
        .pipe(webp({quality: 80}))
        .on('error', function (err) {
            console.error('WebP Error:', err);
            this.emit('end');
        })
        .pipe(flatten())
        .pipe(debug({title: 'After WEBP:'}))
        .pipe(gulp.dest('./dist/img/webp'));
}

function avifBuild() {
    return gulp
        .src('./src/img/**/*.{jpg,png}')
        .pipe(avif({quality : 80}))
        .on('error', function (err) {
            console.error('Avif Error:', err);
            this.emit('end');
        })
        .pipe(flatten())
        .pipe(debug({title: 'After avif:'}))
        .pipe(gulp.dest('./dist/img/avif'));
}

const svgSpriteConfig = {
    mode: {
        symbol: {
            sprite: 'sprite.svg'
        }
    }
};

function spriteBuild() {
    return gulp
        .src('./src/img/**/*.svg')
        .pipe(svgSprite(svgSpriteConfig))
        .on('error', function (error) {
            console.error('SVG Sprite Error:', error);
            this.emit('end');
        })
        .pipe(gulp.dest(paths.build.img));
}

function clean() {
    return del('./dist/');
}

const bs = browserSync.create();

function reload(done) {
    bs.reload();
    done();
}

function server() {
    bs.init({
        server: {
            baseDir: './dist/',
            middleware: [
                serveStatic('dist', { extensions: ['html'] })
            ]
        },
        notify: false,
        port: 3000,
    })
}

function ttfToWoff() {
    return gulp
        .src(paths.src.fonts, {encoding: false})
        .pipe(ttf2woff())
        .pipe(gulp.dest(paths.build.fonts));
}

function ttfToWoff2() {
    return gulp
        .src(paths.src.fonts, {encoding: false})
        .pipe(ttf2woff2())
        .pipe(gulp.dest(paths.build.fonts));
}

function watchFiles() {
    gulp.watch('src/html//*.html', gulp.series(html, reload));
    gulp.watch('src/scss//*.scss', style);
    gulp.watch('src/js/**/*.js', gulp.series(js, reload));
    gulp.watch(paths.src.img, gulp.parallel(webpBuild, avifBuild, spriteBuild));
    gulp.watch(paths.src.fonts, gulp.series(ttfToWoff, ttfToWoff2));
    gulp.watch(paths.src.libs, libs);
}


const fonts = gulp.series(ttfToWoff, ttfToWoff2);
const mainTasks = gulp.series(clean, gulp.parallel(html, style, js, fonts, libs, webpBuild, avifBuild, spriteBuild));
const dev = gulp.series(mainTasks, gulp.parallel(watchFiles, server));

const build = gulp.series(mainTasks);

gulp.task('default', dev);
gulp.task('fonts', fonts);
gulp.task('clean', clean);
gulp.task('build', build);