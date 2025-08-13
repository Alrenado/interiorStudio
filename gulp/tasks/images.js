import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import webp from 'gulp-webp';
import avif from '../gulp-avif.js'
import flatten from "gulp-flatten";
import debug from "gulp-debug";
import { paths } from "../config/path.js";

function webpBuild() {
    return gulp
        .src(paths.src.img)
        .pipe(webp({
            quality: 80
        }))
        .on('error', function (err) {
            console.error('WebP Error:', err);
            this.emit('end');
        })
        .pipe(flatten())
        .pipe(debug({title: 'After WEBP:'}))
        .pipe(gulp.dest(paths.build.webp));
}

function avifBuild() {
    return gulp
        .src(paths.src.img)
        .pipe(avif({
            quality : 80
        }))
        .on('error', function (err) {
            console.error('Avif Error:', err);
            this.emit('end');
        })
        .pipe(flatten())
        .pipe(debug({title: 'After avif:'}))
        .pipe(gulp.dest(paths.build.avif));
}

const svgSpriteConfig = {
    mode: {
        symbol: {
            sprite: 'sprite.svg'
        }
    }
};

function spriteBuild() {
    return gulp
        .src(paths.src.svg)
        .pipe(svgSprite(svgSpriteConfig))
        .on('error', function (error) {
            console.error('SVG Sprite Error:', error);
            this.emit('end');
        })
        .pipe(flatten())
        .pipe(gulp.dest(paths.build.svg));
}

export {
    webpBuild,
    avifBuild,
    spriteBuild
};