module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vendorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imageId: {
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

    Category.associat = (models) => {
        Category.hasOne(models.media, {
            foreignKey: "imageId"
        })
    }


    return Category;
}