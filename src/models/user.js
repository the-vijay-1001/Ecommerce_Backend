import constant from "../constant";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'active'
        },
        profileImageURL:{
            type:DataTypes.STRING
        },
        passwordResetToken:{
            type:DataTypes.STRING
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

    User.addScope('customers',{
        where:{
            role:constant.common.ROLE.USER
        }
    })

    User.addScope('admin',{
        where:{
            role:constant.common.ROLE.ADMIN
        }
    })

    User.addScope('vendors',{
        where:{
            role:constant.common.ROLE.VENDOR
        }
    })

    return User;
}

