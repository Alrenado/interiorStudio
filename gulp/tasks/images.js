import gulp from 'gulp';
import paths from "../config/path.js";
import plugins from "../config/plugins.js";
import imagemin from "gulp-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import optipng from "imagemin-optipng";
import pngquant  from 'imagemin-pngquant';
import through2 from 'through2';

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
        .src(paths.src.img)
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
        .src(paths.src.img)
        .pipe(plugins.errorConfig('avif img'))
        .pipe(plugins.avif({
            quality: qualityLevels,
        }))
        .pipe(plugins.flatten())
        .pipe(plugins.debugConfig('avif after build complete.'))
        .pipe(gulp.dest(paths.build.avif));
}

function pngBuild(qualityLevel = 4) {
    // qualityLevel = (qualityLevel >= 0 && qualityLevel <= 7) ? qualityLevel : 4;
    // return gulp
        // .src(paths.src.png, { base: paths.srcFolder, allowEmpty: true })
        // .pipe(plugins.errorConfig('png img'))
        // .pipe(imagemin([
        //     pngquant({
        //         quality: [0.3, qualityLevels[qualityLevel] / 100],
        //         speed: 1,
        //         strip: true,
        //         dithering: 0,
        //     }),
        //     optipng({
        //         optimizationLevel: qualityLevel,
        //         bitDepthReduction: true,
        //         colorTypeReduction: true,
        //         paletteReduction: true,
        //     }),
        // ], {
        //     verbose: true
        // }))
        // .pipe(plugins.flatten())
        // .pipe(plugins.debugConfig('png after build complete.'))
        // .pipe(gulp.dest(paths.build.png))
        // .on('end', () => console.log('PNG build completed, check dist/img/png for output.'));
    return gulp
        .src(paths.src.png, { base: paths.srcFolder, allowEmpty: true })
        .pipe(plugins?.plumber ? plugins.plumber('png copy') : plugins.through2.obj((f,_,cb)=>cb(null,f)))
        .pipe(gulp.dest(paths.build.png));


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
        .pipe(plugins.svgSprite(svgSpriteConfig))
        .pipe(plugins.errorConfig('sprite img'))
        .pipe(plugins.flatten())
        .pipe(plugins.debugConfig('sprite after build complete.'))
        .pipe(gulp.dest(paths.build.svg));
}


const images = gulp.series(
    pngBuild,
    webpBuild,
    avifBuild,
    spriteBuild

)

export { pngBuild };
// const images = pngBuild;

export default images;