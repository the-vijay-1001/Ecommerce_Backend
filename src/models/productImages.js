module.exports = (sequelize, DataTypes) => {
    const productImage = sequelize.define('productImage', {
        productId: {
            type: DataTypes.INTEGER,
            alloNull: false
        },
        imageId: {
            type: DataTypes.INTEGER,
            alloNull: false
        }
    });

    productImage.associate = (models) => {
        productImage.belongsTo(models.product, {
            foreignKey: "productId"
        });
        productImage.belongsTo(models.media, {
            foreignKey: "imageId"
        });
    }
    return productImage;
}