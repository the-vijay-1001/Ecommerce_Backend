import models from "../models";
const { product } = models;
export default {
    async uploadProduct(request) {
        const bodyData = request.body;
        console.log("8888888888888")
        console.log(bodyData);
        const productData = await product.create(bodyData);
        return productData;
    },
}