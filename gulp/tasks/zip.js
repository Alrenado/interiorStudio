import gulp from "gulp";
import { deleteAsync } from "del";
import gulpZip from "gulp-zip";

import {paths} from "../config/path.js";

function zip() {
    return deleteAsync(`./${paths.basePathName}.zip`).then(() => {
        return gulp
            .src(`${paths.buildFolder}/**/*.*`)
            .pipe(gulpZip(`${paths.basePathName}.zip`))
            .pipe(gulp.dest('./'));
    });
}

export {
    zip
}