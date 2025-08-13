import * as nodePath from 'path';

const dist = './dist';
const src = './src';

const basePathName = nodePath.basename(nodePath.resolve());

const paths = {
    build: {
        html: `${dist}/`,
        css: `${dist}/styles`,
        js: `${dist}/js`,

        svg: `${dist}/img/svg`,
        webp: `${dist}/img/webp`,
        avif: `${dist}/img/avif`,

        fonts: `${dist}/fonts`,
        libs: `${dist}/libs`,
    },

    src: {
        html: `${src}/html/pages/*.html`,
        htmlIndex: `${src}/html/pages/**/index.html`,
        htmlPages: `${src}/html/pages`,

        css: `${src}/scss/pages/**/style.scss`,
        js: `${src}/js/script.js`,

        img: `${src}/img/**/*.{jpg,jpeg,png}`,
        svg: `${src}/img/**/*.svg`,

        fonts: `${src}/fonts/*.ttf`,
        libs: `${src}/libs/**/*.*`,
    },

    watch: {
        html: `${src}/html/**/*.html`,
        css: `${src}/scss/**/*.scss`,
        js: `${src}/js/**/*.js`,

        img: `${src}/img/**/*.{jpg,jpeg,png}`,
        svg: `${src}/img/**/*.svg`,

        fonts: `${src}/fonts/*.ttf`,
        libs: `${src}/libs/**/*.*`,
    },
    clean: dist,
    buildFolder: dist,
    srcFolder: src,
    basePathName,
}

export {
    paths
};