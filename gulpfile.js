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

import { pngBuild } from './gulp/tasks/images.js';

import html from "./gulp/tasks/html.js";

function watchFiles() {
    gulp.watch(paths.watch.html, gulp.series(html, server.reload));
    gulp.watch(paths.watch.css, gulp.series(style, server.reload));
    gulp.watch(paths.watch.js, gulp.series(js, server.reload));
    gulp.watch(paths.watch.fonts, gulp.series(fonts, server.reload));
    gulp.watch(paths.watch.libs, gulp.series(libs, server.reload));
    gulp.watch(paths.watch.img, gulp.series(images, server.reload));
}

const mainTasks = gulp.series(clean, gulp.parallel(html, style, js, fonts, libs, images));

const dev = gulp.series(mainTasks, gulp.parallel(watchFiles, server.host));
const build = gulp.series(mainTasks, deploy);

gulp.task('default', dev);
gulp.task('fonts', fonts);
gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('zip', zip);
gulp.task('deploy', deploy);
gulp.task('image', images);
