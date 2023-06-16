import models from '../models'

const { media } = models;

export default {
    async saveMedia(req) {
        try {
            const { files, params } = req;
            const result = await Promise.all(
                files.map(async (file, index) => {
                  return  await media.create({
                        name: file.filename,
                        mediaType: params.mediaType,
                        mediaFor: params.mediaFor,
                        basePath: file.path
                    })
                })
            )
            
            return {status:true,msg:'Files Saved Successfully'}
        } catch (err) {
            console.log(err);
            return {status:false,msg:'Something went wrong !! Try again . . .'}
        }
    }
}