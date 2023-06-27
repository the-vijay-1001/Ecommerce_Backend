import config from '../config';
import models from '../models'

const { media } = models;

export default {
    async saveMedia(req) {
        try {
            const { files, params } = req;
            const file = files[0];
            var basePath = `public\\uploads\\${params.mediaType}\\${params.mediaFor}\\${file.filename}`;
            const result = await media.create({
                name: file.filename,
                mediaType: params.mediaType,
                mediaFor: params.mediaFor,
                basePath
            })

            const baseUrl = `${config.app.url}/${basePath}`

            return { status: true, msg: 'Files Saved Successfully', baseUrl, id: result.dataValues.id }
        } catch (err) {
            console.log(err);
            return { status: false, msg: 'Something went wrong !! Try again . . .' }
        }
    }
}