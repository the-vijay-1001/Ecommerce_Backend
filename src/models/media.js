module.exports = (sequelize, DataTypes) => {
    const media = sequelize.define(
      'media',
      {
        name: {
          type: DataTypes.STRING(100),
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
          ),
        },
        status: {
          type: DataTypes.ENUM('pending', 'used', 'deleted'),
          defaultValue: 'pending',
        },
      },
      {
        underscored: true,
      },
    );
    media.associate = () => {
      // associations can be defined here
    };
    return media;
  };
  