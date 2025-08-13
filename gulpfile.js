// gulp
import gulp from 'gulp';

import {
    paths
} from "./gulp/config/path.js";

import {
    clean
} from "./gulp/tasks/clean.js";

import {
    server,
    reload
} from './gulp/tasks/server.js';

import {
    libs
} from './gulp/tasks/libs.js';

import {
    js
} from './gulp/tasks/javascript.js';

import {
    style
} from './gulp/tasks/scss.js';

import {
    ttfToWoff,
    ttfToWoff2
} from './gulp/tasks/fonts.js';

import {
    webpBuild,
    avifBuild,
    spriteBuild
} from './gulp/tasks/images.js';

import {
    html
} from "./gulp/tasks/html.js";

import {
    zip
}from './gulp/tasks/zip.js';

function watchFiles() {
    gulp.watch(paths.watch.html, gulp.series(html, reload));
    gulp.watch(paths.watch.css, gulp.series(style, reload));
    gulp.watch(paths.watch.js, gulp.series(js, reload));
    gulp.watch(paths.watch.img, gulp.parallel(webpBuild, avifBuild, spriteBuild));
    gulp.watch(paths.watch.fonts, gulp.series(ttfToWoff, ttfToWoff2));
    gulp.watch(paths.watch.libs, gulp.series(libs, reload));
}


const fonts = gulp.series(ttfToWoff, ttfToWoff2);
const images = gulp.series(webpBuild, avifBuild, spriteBuild);

const mainTasks = gulp.series(clean, gulp.parallel(html, style, js, fonts, libs, images));

const dev = gulp.series(mainTasks, gulp.parallel(watchFiles, server));

const build = gulp.series(mainTasks);

gulp.task('default', dev);
gulp.task('fonts', fonts);
gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('zip', zip);