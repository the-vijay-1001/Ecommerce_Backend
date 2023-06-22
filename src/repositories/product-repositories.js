import models from "../models";
const { product ,productImages} = models;
export default {
    async uploadProduct(request) {
        const bodyData = request.body;
        const productData = await product.create(bodyData);
        return productData;
    },
    async uploadProductImage(request) {
        const bodyData = request.body;
        const productImage = await productImages.create(bodyData);
        return productImage;
    },
}