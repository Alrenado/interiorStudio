import gulp from 'gulp';
import { paths } from "../config/path.js";
import { plugins } from "../config/plugins.js";

const compressLevels = {
    first: 90,
    second: 80,
    third: 60,
    fourth: 40,
}

function webpBuild(compressLevel = compressLevels.second) {
    return gulp
        .src(paths.src.img)
        .pipe(plugins.errorConfig('webp img'))
        .pipe(plugins.webp({
            quality: compressLevel
        }))
        .on('error', function (err) {
            console.error('WebP Error:', err);
            this.emit('end');
        })
        .pipe(plugins.flatten())
        .pipe(plugins.debugConfig('webp after build complete.'))
        .pipe(gulp.dest(paths.build.webp));
}

function avifBuild(compressLevel = compressLevels.second) {
    return gulp
        .src(paths.src.img)
        .pipe(plugins.errorConfig('avif img'))
        .pipe(plugins.avif({
            quality : compressLevel
        }))
        .on('error', function (err) {
            console.error('Avif Error:', err);
            this.emit('end');
        })
        .pipe(plugins.flatten())
        .pipe(plugins.debugConfig('avif after build complete.'))
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
        .pipe(plugins.errorConfig('sprite img'))
        .pipe(plugins.svgSprite(svgSpriteConfig))
        .on('error', function (error) {
            console.error('SVG Sprite Error:', error);
            this.emit('end');
        })
        .pipe(plugins.flatten())
        .pipe(plugins.debugConfig('sprite after build complete.'))
        .pipe(gulp.dest(paths.build.svg));
}

export const images = {
    webpBuild,
    avifBuild,
    spriteBuild,
    compressLevels
}