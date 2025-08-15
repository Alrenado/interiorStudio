import plugins from "../config/plugins.js";
import paths from "../config/path.js";

export default function clean() {
    return plugins.del(paths.build.html);
}

