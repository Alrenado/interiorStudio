import fs from 'fs';
import path from 'path';
import through from 'through2';
import sharp from 'sharp';
import PluginError from 'plugin-error';

const ENABLED_FORMATS = ['png', 'jpg', 'jpeg'];

const optionsByDefault = {
    quality: 90,
    lossless: false,
    speed: 5,
    chromaSubsampling: '4:2:0',
};

function avif(options = {}) {
    return through.obj(async (file, _, callback) => {
        try {
            if (!file.path) return callback(null, file);

            const ext = path.extname(file.path).slice(1).toLowerCase();
            if (!ENABLED_FORMATS.includes(ext)) return callback(null, file);

            const buffer = fs.readFileSync(file.path);

            const sharpImage = sharp(buffer);
            const outputBuffer = await sharpImage
                .avif({...optionsByDefault, ...options})
                .toBuffer();

            file.contents = outputBuffer;
            file.extname = '.avif';

            callback(null, file);
        } catch (err) {
            callback(new PluginError('gulp-avif', err, {fileName: file.path}));
        }
    });
}

export default avif;