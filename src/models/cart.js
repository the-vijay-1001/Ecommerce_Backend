module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("cart", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique:true
        },
      
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.user, {
          foreignKey: "userId",
          targetKey: "id",
        })
        Cart.belongsToMany(models.product, {
          through: models.cartitem,
          foreignKey: "cartId",
        //   unique: true,
        });
    }
    return Cart;
}