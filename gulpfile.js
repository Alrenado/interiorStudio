// gulp
import gulp from 'gulp';

//html
import htmlmin from 'gulp-htmlmin';

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
import imagemin, {mozjpeg} from 'gulp-imagemin';

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
        img: './src/img/**/*.{jpg,jpeg,png,gif,webp,ico,svg}',
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
    ], { base: './src/html/pages' })
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
        .pipe(htmlmin({
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


function img() {
    return gulp
        .src(paths.src.img, {encoding: false})
        .pipe(imagemin())
        .pipe(gulp.dest(paths.build.img))
        .pipe(gulp.src('./src/img/**/*.svg'))
        .pipe(gulp.dest(paths.build.img))
        .pipe(browserSync.stream());

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

// function watchFiles() {
//     gulp.watch(paths.src.html, html);
//     gulp.watch(paths.src.css, style);
//     gulp.watch(paths.src.js, js);
//     gulp.watch(paths.src.libs, libs);
//     gulp.watch(paths.src.img, img);
// }

function watchFiles() {
    gulp.watch('src/html//*.html', gulp.series(html, reload));
    gulp.watch('src/scss//*.scss', style);
    gulp.watch('src/js/**/*.js', gulp.series(js, reload));
    gulp.watch(paths.src.img, img);
    gulp.watch(paths.src.fonts, gulp.series(ttfToWoff, ttfToWoff2));
    gulp.watch(paths.src.libs, libs);
}


const fonts = gulp.series(ttfToWoff, ttfToWoff2);
const mainTasks = gulp.series(clean, gulp.parallel(html, style, js, fonts, libs, img));
const dev = gulp.series(mainTasks, gulp.parallel(watchFiles, server));

const build = gulp.series(mainTasks);

gulp.task('default', dev);
gulp.task('fonts', fonts);
gulp.task('clean', clean);
gulp.task('build', build);