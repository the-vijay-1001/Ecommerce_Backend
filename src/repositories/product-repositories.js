import models from "../models";
const { product } = models;
export default {
    async uploadProduct(request) {
        const bodyData = request.body;
        const productData = await product.create(bodyData);
        return productData;
    },
    async productList(){
        const products=await product.findAll();
        return products;
    }
}