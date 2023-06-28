import models from "../models";
const { category, categoryImage, media } = models;
export default {
    async addCategory(request) {
        const bodyData = request.body;
        const categoryData = await category.create(bodyData);
        const media2 = await media.findAll();
        console.log(media2)
        // const category1 = await categoryImage.create({
        //     imageId: bodyData.imageUrl,
        //     categoryId: bodyData.id,
        // })
        return categoryData;
    },

    async uploadCategoryImage(request) {
        const { imageId } = request;
        //console.log("this is request");
        //console.log(request);
        const categoryImg = await categoryImage.create(request);
        return categoryImg;
    },
}
