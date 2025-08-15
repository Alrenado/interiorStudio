import gulp from 'gulp';

import paths  from "../config/path.js";
import plugins from "../config/plugins.js";

export default function deploy() {
    return gulp.src(paths.build.deploy)
        .pipe(plugins.replace(
            /(["'])\/([^"']+)/g,
            '$1/' + paths.basePathName + '/$2'
        ))
        .pipe(plugins.errorConfig('git deploy'))
        .pipe(plugins.ghPages({
            message: 'feat: github page deploy [ ' + (new Date()).toUTCString() + ' ]'
        }))
        .pipe(plugins.debugConfig('zip after build complete.'));
}

