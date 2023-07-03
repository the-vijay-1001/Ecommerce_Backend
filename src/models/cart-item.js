module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define("cartitem",{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return CartItem;    
};
