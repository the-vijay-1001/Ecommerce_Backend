import models from '../models';
import bcrypt from 'bcryptjs';
import jwt from '../services/jwt.js'
import constant from '../constant/index.js';
const { user } = models;
export default {
    async vendorSignup(request) {
        const bodyData = request.body;
        const hashPassword = await this.generateEncryptedPassword(
            bodyData.password,
        );
        bodyData.password = hashPassword;
        bodyData.role = constant.common.ROLE.VENDOR;
        console.clear();
        console.log(bodyData);
        const userData = await user.create(bodyData);
        return userData;
    },

    async vendorSignin(request) {
        const { email, password } = request.body;
        const havingEmail = await user.scope('vendors').findOne({ where: { email: email } });
        if (havingEmail) {
            const isPasswordMatch = await this.compareUserPassword(password, havingEmail.password);
            if (isPasswordMatch) {
                const { ...userData } = havingEmail.get();
                const token = jwt.createToken(userData)
                return { token, ...userData };
            }
        }
        return { status: false, msg: "No Vendor Found" };
    },

    async compareUserPassword(password, hashPassword) {
        let isPasswordMatch = '';
        if (password && hashPassword) {
            isPasswordMatch = await bcrypt.compare(password, hashPassword);
        }
        return isPasswordMatch;
    },
    async generateEncryptedPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        } catch (err) {
            console.log(err)
            throw new Error("Something went wrong");
        }
    },
    async vendorUpdateProfile(request) {
            const vendorobj = { ...request.body };
            console.log(vendorobj);
            const vendor = await user.scope('vendors').findOne({ where: { id: vendorobj.bodyData.id } });
            if (!vendor) {
                return { status: false, msg: "Invalid Request" }
            }
            user.name = userobj.name ? vendorobj.name : user.name;
            user.contact = userobj.contact ? vendorobj.contact : user.contact;
            user.email = userobj.email ? vendorobj.email : user.email;
            await user.save();
            return { status: true, msg: "Profile updated succesfully" }      
    },
}