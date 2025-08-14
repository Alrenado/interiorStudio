import gulp from 'gulp';

import {paths} from "../config/path.js";
import {plugins} from "../config/plugins.js";

function libs() {
    return gulp
        .src(paths.src.libs)
        .pipe(plugins.errorConfig('libs'))
        .pipe(gulp.dest(paths.build.libs))
        .pipe(plugins.debugConfig('libs after build complete.'))
        .pipe(plugins.browserSync.stream());
}

export {
    libs
};