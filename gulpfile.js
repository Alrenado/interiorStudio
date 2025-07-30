// gulp
import gulp from 'gulp';

//css
//scss
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";

// live coding
import browserSync from 'browser-sync';

// js
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

// img
import { execa } from 'execa';

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
        js: './src/js/main.js',
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
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.js))
        .pipe(browserSync.stream());
}

function style() {
    return gulp
        .src(paths.src.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.stream());
}

function minifyCSS() {
    return gulp
        .src('dist/css/style.css')
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.build.css))
}

function libs() {
    return gulp
        .src(paths.src.libs)
        .pipe(gulp.dest(paths.build.libs))
        .pipe(browserSync.stream());
}

function html() {
    return gulp
        .src(paths.src.html)
        .pipe(fileInclude())
        .pipe(gulp.dest(paths.build.html))
        .pipe(browserSync.stream());
}

function img() {
    return gulp
        .src(paths.src.img, {encoding: false})
        .pipe(gulp.dest(paths.build.img))
        .pipe(browserSync.stream());

}

function squooshImages() {
    return execa('npx', [
        '@squoosh/cli',
        '--mozjpeg', '{"quality":75}',
        '--oxipng', '{"level":2}',
        '-d', paths.build.img,
        paths.src.img
    ]);
}

function clean() {
    return del('./dist/');
}

function server() {
    browserSync.init({
        server: {
            baseDir: './dist/'
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
    gulp.watch(paths.src.html, html);
    gulp.watch(paths.src.css, style);
    gulp.watch(paths.src.js, js);
    gulp.watch(paths.src.libs, libs);
    gulp.watch(paths.src.img, img);
}

const fonts = gulp.series(ttfToWoff, ttfToWoff2);
const mainTasks = gulp.series(clean, gulp.parallel(html, style, js, fonts, libs, img));
const dev = gulp.series(mainTasks, gulp.parallel(watchFiles, server));

const build = gulp.series(mainTasks, minifyCSS);

gulp.task('default', dev);
gulp.task('fonts', fonts);
gulp.task('clean', clean);
gulp.task('build', build);