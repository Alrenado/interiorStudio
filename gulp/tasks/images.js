import gulp from 'gulp';
import paths from "../config/path.js";
import plugins from "../config/plugins.js";

const qualityLevels = {
    0: 100,
    1: 95,
    2: 90,
    3: 80,
    4: 70,
    5: 60,
    6: 50,
    7: 40,
}

function webpBuild(qualityLevels = 3){
    qualityLevels = (qualityLevels >= 0 && qualityLevels <= 7) ? qualityLevels : 3;
    return gulp
        .src(paths.src.png, {encoding: false})
        .pipe(plugins.errorConfig('webp img'))
        .pipe(plugins.webp({
            quality: qualityLevels,
        }))
        .pipe(plugins.flatten())
        .pipe(plugins.debugConfig('webp after build complete.'))
        .pipe(gulp.dest(paths.build.webp));
}

function avifBuild(qualityLevels = 3) {
    qualityLevels = (qualityLevels >= 0 && qualityLevels <= 7) ? qualityLevels : 3;
    return gulp
        .src(paths.src.png, {encoding: false})
        .pipe(plugins.errorConfig('avif img'))
        .pipe(plugins.avif({
            quality: qualityLevels,
        }))
        .pipe(plugins.flatten())
        .pipe(plugins.debugConfig('avif after build complete.'))
        .pipe(gulp.dest(paths.build.avif));
}

function pngBuild(qualityLevel = 4) {
    qualityLevel = (qualityLevel >= 0 && qualityLevel <= 7) ? qualityLevel : 4;
    return gulp
        .src(paths.src.png, {encoding: false})
        .pipe(plugins.errorConfig('png img'))
        .pipe(plugins.imagemin([
            plugins.pngquant({
                quality: [0.3, qualityLevels[qualityLevel] / 100],
                speed: 1,
                strip: true,
                dithering: 0,
            }),
            plugins.optipng({
                optimizationLevel: qualityLevel,
                bitDepthReduction: true,
                colorTypeReduction: true,
                paletteReduction: true,
            }),
        ], {
            verbose: true
        }))
        .pipe(plugins.flatten())
        .pipe(plugins.debugConfig('png after build complete.'))
        .pipe(gulp.dest(paths.build.png))
        .on('end', () => console.log('PNG build completed, check dist/img/png for output.'));
}

const svgSpriteConfig = {
    mode: {
        symbol: {
            sprite: 'sprite.svg'
        }
    }
}

function spriteBuild() {
    return gulp
        .src(paths.src.svg)
        .pipe(plugins.svgSprite(svgSpriteConfig))
        .pipe(plugins.errorConfig('sprite img'))
        .pipe(plugins.flatten())
        .pipe(plugins.debugConfig('sprite after build complete.'))
        .pipe(gulp.dest(paths.build.svg));
}

const images = gulp.parallel(
    pngBuild,
    webpBuild,
    avifBuild,
    spriteBuild
);

export default images;