import paths from "../config/path.js";
import plugins from "../config/plugins.js";

function bundleOne(absPath) {
    const parent = plugins.path.basename(plugins.path.dirname(absPath));
    const outFile = `${parent}.bundle.js`;
    console.log(absPath, parent, outFile);

    const babelifyTransformer = plugins.babelify.configure({
        babelrc: false,
        presets: ["@babel/preset-env"],
        extensions: [".js", ".mjs"],
        sourceMaps: true,
    });

    return new Promise((resolve, reject) => {
        plugins.browserify({ entries: [absPath], debug: true })
            .transform(babelifyTransformer)
            .bundle()
            .on("error", (err) => {
                console.error(err.message || err);
                reject(err);
            })
            .pipe(plugins.source(outFile))
            .pipe(plugins.buffer())
            .pipe(plugins.sourcemaps.init({ loadMaps: true }))
            .pipe(plugins.uglify())
            .pipe(plugins.sourcemaps.write("."))
            .pipe(plugins.dest(paths.build.js))
            .on("end", resolve);
    });
}

export default function js() {
    const entries = plugins.globSync(paths.src.js);
    return Promise.all(entries.map((f) => bundleOne(plugins.path.resolve(f))));
}
