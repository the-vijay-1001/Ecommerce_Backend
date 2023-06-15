import httpStatus from "http-status";
import media from "../models/media";

export default {
    async saveFile(req) {
        try {
            const { files, param: { mediaType, mediaFor } } = req;
            const result = await Promise.all(
                files.map(async file => {
                    return await media.create({
                        name: file.filename,
                        basePath: file.path,
                        mediaFor,
                        mediaType
                    })
                })
            )
            if(result)
            return result.status(httpStatus.OK).json({status:true,msg:"file saved"})
        } catch (err) { console.log(err) }
    }
}