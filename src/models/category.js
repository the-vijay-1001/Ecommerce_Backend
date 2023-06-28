module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        categoryName: {
            type: DataTypes.STRING,
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
    Category.associate = (models) => {
        Category.hasMany(models.product, {
            foreignKey: "category"
        })
    },
    Category.associate = (models) => {
        Category.hasOne(models.categoryImage, {
          foreignKey: "categoryId"
        });
      };
      
    return Category;
}