import gulp from 'gulp';
import htmlMin from 'gulp-htmlmin';
import fileInclude from "gulp-file-include";
import rename from "gulp-rename";
import browserSync from "browser-sync";
import { paths } from "../config/path.js";

function html() {
    return gulp.src([
        paths.src.htmlIndex,
        paths.src.html
    ], {
        base: paths.src.htmlPages
    })
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(rename(file => {
            const pageName = file.basename === 'index'
                ? file.dirname
                : file.basename;
            file.dirname  = '';
            file.basename = pageName;
        }))
        .pipe(htmlMin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            sortClassName: true,
            sortAttributes: true,
            removeComments: true,
        }))
        .pipe(gulp.dest(paths.build.html))
        .pipe(browserSync.stream());
}

export {
    html
}