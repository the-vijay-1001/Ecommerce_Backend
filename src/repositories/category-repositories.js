import models from "../models";
const { category, categoryImage, media } = models;
export default {
    async addCategory(request) {
        const bodyData = request.body;
        const categoryData = await category.create(bodyData);
        return categoryData;
    },

    async uploadCategoryImage(request) {
        const { imageId } = request;
        const categoryImg = await categoryImage.create(request);
        return categoryImg;
    },
    async categoryList(request){
        const categoryData = await category.findAll({
            include: [
                {
                  model: categoryImage,
                  include: [
                    {
                      model: media,
                    },
                  ],
                },
              ],
        });
        return categoryData;
    }
}
