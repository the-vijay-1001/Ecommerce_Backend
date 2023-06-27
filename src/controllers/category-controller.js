import httpStatus from "http-status";
import repositories from "../repositories";

const {categoryRepositories} = repositories;
export default {
    async addCategory(request, response, next) {
        try {
            const result = await categoryRepositories.addCategory(request);
            if(result){
                let categoryId = result.dataValues.id;
                let imageId = request.body.imageId;
                const res = await categoryRepositories.uploadCategoryImage({ categoryId, imageId });
                if (res) {
                    return response.status(httpStatus.OK).json({ result, message: 'Category Added........' });
                }
            }
            return response.status(httpStatus.BAD_REQUEST).json({ message: 'SOMETHING WENT WRONG.....' });

        } catch (error) {
            next(error)
        }
    }
}