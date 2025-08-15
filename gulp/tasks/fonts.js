import gulp from 'gulp';
import paths from "../config/path.js";
import plugins from "../config/plugins.js";

function ttfToWoff() {
    return gulp
        .src(paths.src.fonts, {encoding: false})
        .pipe(plugins.errorConfig('ttfToWoff'))
        .pipe(plugins.ttf2woff())
        .pipe(plugins.debugConfig('ttfToWoff after build complete.'))
        .pipe(gulp.dest(paths.build.fonts));
}

function ttfToWoff2() {
    return gulp
        .src(paths.src.fonts, {encoding: false})
        .pipe(plugins.errorConfig('ttfToWoff2'))
        .pipe(plugins.ttf2woff2())
        .pipe(plugins.debugConfig('ttfToWoff2 after build complete.'))
        .pipe(gulp.dest(paths.build.fonts));
}
const fonts = {
    ttfToWoff,
    ttfToWoff2
}

export default fonts;