import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";

//clean
import {deleteAsync as del} from 'del';

//img
import svgSprite from 'gulp-svg-sprite';
import webp from 'gulp-webp';
import avif from '../gulp-avif.js'
// import imagemin from "gulp-imagemin";
// import imageminMozjpeg from "imagemin-mozjpeg";
// import imageminOptipng from "imagemin-optipng";
// import imageminSvgo from "imagemin-svgo";
// import imageminPngquant from 'imagemin-pngquant';
import through2 from 'through2';


//fonts
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";

//html
import htmlMin from 'gulp-htmlmin';
import fileInclude from "gulp-file-include";
import rename from "gulp-rename";
import browserSync from "browser-sync";

//js
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

//css
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";

//server
import serveStatic from 'serve-static';

//zip
import gulpZip from "gulp-zip";

//git
import git from "gulp-git";
import ghPages from "gulp-gh-pages";
import replace from "gulp-replace";

import debug from "gulp-debug";
import flatten from "gulp-flatten";

const errorConfig = (taskName) => {
    return plumber({
        errorHandler: notify.onError({
            title: taskName,
            message: 'Error: <%= error.message %>',
            sound: false
        }),
    });
}

const debugConfig = (debugName) => {
    return debug({
        title: debugName,
    })
}

const plugins = {
    errorConfig,
    debugConfig,

    notify,
    plumber,

    //img
    svgSprite,
    webp,
    avif,
    // imagemin,
    // imageminPngquant,
    // imageminOptipng,

    //fonts
    ttf2woff,
    ttf2woff2,

    //html
    htmlMin,
    fileInclude,
    rename,
    browserSync,

    //js
    uglify,
    concat,

    //css
    dartSass,
    gulpSass,
    sass,
    autoprefixer,
    cleanCSS,
    sourcemaps,

    //server
    serveStatic,

    //zip
    gulpZip,

    flatten,
    debug,
    del,

    git,
    ghPages,
    replace,
}

export default plugins;