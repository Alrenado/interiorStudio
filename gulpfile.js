// gulp
import gulp from 'gulp';

import paths from "./gulp/config/path.js";

import clean from "./gulp/tasks/clean.js";
import server from './gulp/tasks/server.js';
import zip from './gulp/tasks/zip.js';
import deploy from './gulp/tasks/deploy.js';

import libs from './gulp/tasks/libs.js';
import js from './gulp/tasks/javascript.js';
import style from './gulp/tasks/scss.js';
import fonts from './gulp/tasks/fonts.js';
import images from './gulp/tasks/images.js';
import html from "./gulp/tasks/html.js";

function watchFiles() {
    gulp.watch(paths.watch.html, gulp.series(html, server.reload));
    gulp.watch(paths.watch.css, gulp.series(style, server.reload));
    gulp.watch(paths.watch.js, gulp.series(js, server.reload));
    gulp.watch(paths.watch.fonts, gulp.series(fonts.ttfToWoff, fonts.ttfToWoff2));
    gulp.watch(paths.watch.libs, gulp.series(libs, server.reload));
    gulp.watch(paths.watch.img, gulp.parallel(
        () => images.webpBuild(images.compressLevels.second),
        () => images.avifBuild(images.compressLevels.second),
        images.spriteBuild
    ));
}



const font = gulp.series(fonts.ttfToWoff, fonts.ttfToWoff2);
const image = gulp.series(
    () => images.webpBuild(images.compressLevels.second),
    () => images.avifBuild(images.compressLevels.second),
    images.spriteBuild);

const mainTasks = gulp.series(clean, gulp.parallel(html, style, js, font, libs, image));

const dev = gulp.series(mainTasks, gulp.parallel(watchFiles, server.host));

const build = gulp.series(mainTasks);

gulp.task('default', dev);
gulp.task('fonts', font);
gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('zip', zip);
gulp.task('deploy', deploy);