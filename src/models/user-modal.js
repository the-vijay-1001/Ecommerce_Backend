import { DataTypes } from 'sequelize';
import sequelize from "./index.js";

const User = sequelize.define("user",{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
       
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isNumeric: true
        }
    },
    role: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type : DataTypes.BOOLEAN,
        allowNull : false,
        default : true
    }
});
sequelize.sync()
.then(result=>{
    console.log("users table created....");
})
.catch(err=>{
    
});
export default User;