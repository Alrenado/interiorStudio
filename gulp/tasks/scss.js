import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";

import { paths } from "../config/path.js";
import browserSync from "browser-sync";

function style() {
    return gulp
        .src(paths.src.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.stream());
}

export {
    style
};