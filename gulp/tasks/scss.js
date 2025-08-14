import gulp from 'gulp';

import { paths } from "../config/path.js";
import {plugins} from "../config/plugins.js";


function style() {
    return gulp
        .src(paths.src.css)
        .pipe(plugins.errorConfig('css'))
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cleanCSS())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.build.css))
        .pipe(plugins.debugConfig('css after build complete.'))
        .pipe(plugins.browserSync.stream());
}

export {
    style
};