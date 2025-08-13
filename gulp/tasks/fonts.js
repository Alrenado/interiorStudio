import gulp from 'gulp';
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import { paths } from "../config/path.js";

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

export {
    ttfToWoff,
    ttfToWoff2
};