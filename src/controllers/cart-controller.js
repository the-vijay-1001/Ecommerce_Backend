import httpStatus from "http-status";
import repositories from "../repositories";

const { cartRepositories } = repositories;

export default {
  async addToCart(request, response, next) {
    try {
      const result = await cartRepositories.addToCartProduct(request);
      if (result.status) {
        if (result.message === "Product is already added in cart") {
          return response.status(httpStatus.OK).json(result);
        }
        return response.status(httpStatus.OK).json({ message: "Product Added Successfully", result, status: true });
      } else {
        return response.status(httpStatus.BAD_REQUEST).json({ message: "Something went wrong", status: false });
      }
    } catch (error) {
      next(error);
    }
  },

  async list(request, response, next) {
    try {
      const result = await cartRepositories.list(request);

      if (result.status === false) {
        return response.status(httpStatus.NOT_FOUND).json({ message: "User does not exist", status: false });
      }

      return response.status(httpStatus.OK).json({ message: "Cart fetch successful", status: true, result });
    } catch (error) {
      next(error);
    }
  },

  async removeFromCart(request, response, next) {
    try {
      const { productId } = request.body;

      const result = await cartRepositories.removeFromCartByProductId(productId);

      if (result.status) {
        return response.status(httpStatus.OK).json({
          message: "Product removed from cart successfully",
          status: true,
        });
      } else {
        return response.status(httpStatus.NOT_FOUND).json({
          message: "Product not found in cart",
          status: false,
        });
      }
    } catch (error) {
      next(error);
    }
  },

};
