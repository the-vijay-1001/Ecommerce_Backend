import models from "../models";
const { product ,productImage,media } = models;
export default {
    async uploadProduct(request) {
        const bodyData = request.body;
        //console.log(bodyData);
        const productData = await product.create(bodyData);
        return productData;
    },
    async productList(){
        const products=await product.findAll({
            include: [
                {
                  model: productImage,
                  include: [
                    {
                      model: media, 
                    },
                  ],
                },
              ],
        });
        return products;
    },
    async uploadProductImage(request) {
        const {imageId } = request;
        //console.log(imageId);
        const productImages = await productImage.create(request);
        return productImages;
    },
}