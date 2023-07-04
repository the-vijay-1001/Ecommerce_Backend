import models from "../models";
const { product, productImage, media } = models;
let clickCount = 0;

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
      limit: 4
    });

    return productList;
  },

  async moreProductListById(request) {
    const { vendorId, pre , next } = request.body;
    clickCount = pre;
    const offset = (pre  * next );
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
      limit: next,
      offset: offset
    });
    return productList;
  },

  async productRemoveById(request) {
    const { productId } = request.body;
    const productRemoved = await product.destroy({
      where: { id: productId }
    });
    return productRemoved;
  },

  async uploadProductImage(request) {
    const { imageId } = request;
    const productImages = await productImage.create(request);
    return productImages;
  },
}