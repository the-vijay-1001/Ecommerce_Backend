import models from "../models";
const { category,categoryImage } = models;
export default {
    async addCategory(request) {
        const bodyData = request.body;
        const categoryData = await category.create(bodyData);
        return categoryData;
    },
        
    async uploadCategoryImage(request) {
        const {imageId } = request;
        //console.log("this is request");
        //console.log(request);
        const categoryImg = await categoryImage.create(request);
        return categoryImg;
    },
}