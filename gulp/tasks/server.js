import gulp from 'gulp';
import serveStatic from 'serve-static';
import browserSync from 'browser-sync';

import {paths} from "../config/path.js";

const bs = browserSync.create();

function server() {
    bs.init({
        server: {
            baseDir: paths.build.html,
            middleware: [
                serveStatic('dist', { extensions: ['html'] })
            ]
        },
        notify: false,
        port: 3000,
    })
}

function reload(done) {
    bs.reload();
    done();
}

export {
    server,
    reload
};