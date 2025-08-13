import gulp from 'gulp';

import {paths} from "../config/path.js";
import browserSync from "browser-sync";

function libs() {
    return gulp
        .src(paths.src.libs)
        .pipe(gulp.dest(paths.build.libs))
        .pipe(browserSync.stream());
}

export {
    libs
};