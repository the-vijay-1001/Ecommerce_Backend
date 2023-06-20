import config from '../config';
import models from '../models'

const { media } = models;

export default {
    async saveMedia(req) {
        try {
            const { files, params } = req;
            var baseUrl;
            const result = await Promise.all(
               await files.map(async (file, index) => {
                 baseUrl = `${config.app.url}\\public\\uploads\\${params.mediaType}\\${params.mediaFor}\\${file.filename}`;
                  return  await media.create({
                        name: file.filename,
                        mediaType: params.mediaType,
                        mediaFor: params.mediaFor,
                        baseUrl,
                        basePath: `public\\uploads\\${params.mediaType}\\${params.mediaFor}\\${file.filename}`
                    })
                })
            )
            
            return {status:true,msg:'Files Saved Successfully' , baseUrl}
        } catch (err) {
            console.log(err);
            return {status:false,msg:'Something went wrong !! Try again . . .'}
        }
    }
}