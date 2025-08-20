import gulp from 'gulp';
import paths from "../config/path.js";
import html from "./html.js";
import server from "./server.js";
import style from "./scss.js";
import js from "./javascript.js";
import fonts from "./fonts.js";
import images from "./images.js";

export default function watchFiles() {
    gulp.watch(paths.watch.html, gulp.series(html, server.reload));
    gulp.watch(paths.watch.css, gulp.series(style, server.reload));
    gulp.watch(paths.watch.js, gulp.series(js, server.reload));
    gulp.watch(paths.watch.fonts, gulp.series(fonts, server.reload));
    gulp.watch(paths.watch.img, gulp.series(images, server.reload));
}
