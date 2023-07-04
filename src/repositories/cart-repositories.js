import models from "../models";
const { cart, cartitem } = models;

export default {
  async addToCartProduct(request) {
    const t = await models.sequelize.transaction();

    try {
      let userCart = await cart.findOne({ raw: true, where: { userId: request.body.userId }, transaction: t });
      userCart = userCart ? userCart : await cart.create(request.body, { transaction: t });


      if (userCart) {
        let cartItem = await cartitem.findOne({
          raw: true,
          where: {
            cartId: userCart.id,
            productId: request.body.productId
          },
          transaction: t
        });

        if (cartItem) {
          await t.rollback();
          return { message: "Product is already added in cart", status: true };
        }

        await cartitem.create({
          productId: request.body.productId,
          cartId: userCart.id
        }, { transaction: t });

        await t.commit();
        return { message: "Item added in cart", status: true };
      } else {
        let newCart = await cart.create({ userId: request.body.userId }, { transaction: t });

        await cartitem.create({
          productId: request.body.productId,
          cartId: newCart.id
        }, { transaction: t });

        await t.commit();
        return { message: "Item added in cart", status: true };
      }
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async list(request) {
    try {
      const { userId } = request.body;
      const carts = await cart.findAll({ where: { userId } });

      if (carts.length === 0) {
        return { message: "User does not exist", status: false };
      }

      return carts;
    } catch (error) {
      console.log(error);
    }
  },

  async removeFromCartByProductId(productId) {
    try {
      const cartItem = await cartitem.findOne({
        where: { productId },
      });

      if (!cartItem) {
        return { status: false };
      }

      await cartItem.destroy();

      return { status: true };
    } catch (error) {
      throw error;
    }
  },

};

