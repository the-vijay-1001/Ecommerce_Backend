module.exports = (sequelize, DataTypes) => {
    const media = sequelize.define('media', {
        name: {
            type: DataTypes.STRING,
        },
        basePath: {
            type: DataTypes.STRING,
        },
        baseUrl: {
            type: DataTypes.STRING,
        },
        mediaType: {
            type: DataTypes.ENUM('image', 'file', 'audio', 'video'),
        },
        mediaFor: {
            type: DataTypes.ENUM(
                'user',
                'banner',
                'admin',
                'product',
                'aboutUsPage',
            ),
        },
        status: {
            type: DataTypes.ENUM('pending', 'used', 'deleted'),
            defaultValue: 'pending',
        },
    },)

    media.associate = (models) => {
        media.hasOne(models.productImage, {
            foreignKey: "imageId"
        })
    }

    media.associate = (models) => {
        media.hasOne(models.category, {
            foreignKey: "imageId"
        })
    }
    return media;
}