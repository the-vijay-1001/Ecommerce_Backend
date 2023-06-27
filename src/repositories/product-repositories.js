import models from "../models";
const { product, productImage, media } = models;
export default {
  async uploadProduct(request) {
    const bodyData = request.body;
    const productData = await product.create(bodyData);
    return productData;
  },
  async productList() {
    const products = await product.findAll({
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

  async productListById(request) {
    const { vendorId } = request.body;
    const productList = await product.findAll({
      where: { vendorId: vendorId },
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
    return productList;
  },

  async uploadProductImage(request) {
    const { imageId } = request;
    console.log(imageId);
    const productImages = await productImage.create(request);
    return productImages;
  },
}