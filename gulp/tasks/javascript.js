import gulp from 'gulp';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

import {paths} from "../config/path.js";
import browserSync from "browser-sync";

function js() {
    return gulp
        .src(paths.src.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.js))
        .pipe(browserSync.stream());
}

export {
    js
};