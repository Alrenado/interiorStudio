import gulp from 'gulp';

import {paths} from "../config/path.js";
import {plugins} from "../config/plugins.js";

function js() {
    return gulp
        .src(paths.src.js)
        .pipe(plugins.errorConfig('js'))
        .pipe(plugins.concat('script.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.build.js))
        .pipe(plugins.debugConfig('js after build complete.'))
        .pipe(plugins.browserSync.stream());
}

export {
    js
};