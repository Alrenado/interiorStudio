import gulp from "gulp";
import {deleteAsync as del} from 'del';

import { paths } from "../config/path.js";

function clean() {
    return del('./dist/');
}

export {
    clean
};