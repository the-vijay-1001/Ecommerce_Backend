module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("cart",{
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId:{
            type: DataTypes.INTEGER,
            allowNull: false
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
    // Cart.belongsTo(models.User, {
    //     foreignKey: "userId"
    // });
    Cart.associate=(models)=>{
        Cart.hasOne(models.user,{
            foreignKey:"userId" 
        })
        Cart.hasMany(models.product, {
            foreignKey: "cartId"
          });
          
    }
    return Cart;
}