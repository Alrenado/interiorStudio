import { plugins } from "../config/plugins.js";
import { paths } from "../config/path.js";

const bs = plugins.browserSync.create();

function host() {
    bs.init({
        server: {
            baseDir: paths.build.html,
            middleware: [
                plugins.serveStatic('dist', { extensions: ['html'] })
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

export const server = {
    host,
    reload
};