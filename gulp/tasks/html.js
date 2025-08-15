import gulp from 'gulp';

import paths from "../config/path.js";
import plugins from "../config/plugins.js";

export default function html() {
    return gulp.src([
        paths.src.htmlIndex,
        paths.src.html
    ], {
        base: paths.src.htmlPages
    })
        .pipe(plugins.errorConfig('html'))
        .pipe(plugins.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(plugins.rename(file => {
            const pageName = file.basename === 'index'
                ? file.dirname
                : file.basename;
            file.dirname = '';
            file.basename = pageName;
        }))
        .pipe(plugins.htmlMin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            sortClassName: true,
            sortAttributes: true,
            removeComments: true,
        }))
        .pipe(gulp.dest(paths.build.html))
        .pipe(plugins.debugConfig('html after build complete.'))
        .pipe(plugins.browserSync.stream());
}