module.exports = (sequelize, DataTypes) => {
    const CategoryImage = sequelize.define('categoryImage', {
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        imageId: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    });

    CategoryImage.associate = (models) => {
        CategoryImage.belongsTo(models.category, {
            foreignKey: "categoryId"
        });
        CategoryImage.belongsTo(models.media, {
            foreignKey: "imageId"
        });
    }
    return CategoryImage;
}