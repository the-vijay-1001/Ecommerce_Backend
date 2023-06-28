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
                    console.log("this is response");
                    console.log(res);
                    return response.status(httpStatus.OK).json({ result, message: 'Category Added........' });
                }
            }
            return response.status(httpStatus.BAD_REQUEST).json({ message: 'SOMETHING WENT WRONG.....' });

        } catch (error) {
            next(error)
        }
    },
    async categoryList(request,response,next){
        try{
            const result= await categoryRepositories.categoryList(request);
            if (result) {
                return response.status(httpStatus.OK).json({ result, message: "Category fetch successfully" });
            }
            return response.status(httpStatus.BAD_REQUEST).json({ message: "bad requesst" });
        }
        catch(error){
            console.log(error);
        }
    }
}