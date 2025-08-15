import gulp from "gulp";
import paths from "../config/path.js";
import plugins from "../config/plugins.js";

export default function zip() {
    return plugins.del(`./${paths.basePathName}.zip`).then(() => {
        return gulp
            .src(`${paths.buildFolder}/**/*.*`)
            .pipe(plugins.errorConfig('zip'))
            .pipe(plugins.gulpZip(`${paths.basePathName}.zip`))
            .pipe(plugins.debugConfig('zip after build complete.'))
            .pipe(gulp.dest('./'));
    });
}
