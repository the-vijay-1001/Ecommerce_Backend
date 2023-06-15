import userRepositories from "./user-repositories.js"
import User from "../models/user-modal.js";
import bcrypt from "bcryptjs";
import jwt from "../services/jwt.js"
export default {
    async userSignup(request) {
        try {
            const bodyData = request.body;
            const hashPassword = await userRepositories.createHashPassword(
                bodyData.password,
            );
            bodyData.password = hashPassword;
            const userData = await User.create(bodyData);
            return userData;
        } catch (error) {
            console.log(error)
            return false;
        }
    },

    async userSignin(request) {
        try {
            const {email , password} = request.body;
            const havingEmail =await User.findOne({ where: { email: email } });
            if (havingEmail) {
                const isPasswordMatch = await this.compareUserPassword(password,havingEmail.password);
                if(isPasswordMatch){
                    const {...userData} = havingEmail.get();
                    const token = jwt.createToken(userData)
                    return { token, ...userData };
                }
            }
        } catch (error) {
            return false;
        }
    },

    async compareUserPassword(password, hashPassword) {
        try {
            let isPasswordMatch = '';
            if (password && hashPassword) {
                isPasswordMatch = await bcrypt.compare(password, hashPassword);
            }
            return isPasswordMatch;
        } catch (error) {
            logMessage.accountErrorMessage('comparePassword', { error });
            throw Error(error);
        }
    }
}