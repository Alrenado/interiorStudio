import { plugins } from "../config/plugins.js";
import { paths } from "../config/path.js";

function clean() {
    return plugins.del(paths.build.html);
}

export {
    clean
};