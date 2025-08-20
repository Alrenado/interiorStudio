// gulp
import gulp from 'gulp';

import clean from "./gulp/tasks/clean.js";
import server from './gulp/tasks/server.js';
import deploy from './gulp/tasks/deploy.js';
import js from './gulp/tasks/javascript.js';
import style from './gulp/tasks/scss.js';
import fonts from './gulp/tasks/fonts.js';
import images from './gulp/tasks/images.js';
import html from "./gulp/tasks/html.js";
import watcher from "./gulp/tasks/watcher.js";

const build = gulp.series(clean, gulp.parallel(html, style, js, fonts, images));
const dev = gulp.series(build, gulp.parallel(watcher, server.host));

gulp.task('default', dev);
gulp.task('fonts', fonts);
gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('deploy', gulp.series(build, deploy));
gulp.task('images', images);
