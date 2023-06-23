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
            console.log("000000000000000");
            console.log(vendorobj);
            const vendor = await user.scope('vendors').findOne({ where: { id: vendorobj?.bodyData?.id } });
            if (!vendor) {
                return { status: false, msg: "Invalid Request" }
            }
            vendor.name = vendorobj.bodyData.name ? vendorobj.bodyData.name : user.name;
            vendor.contact = vendorobj.bodyData.contact ? vendorobj.bodyData.contact : user.contact;
            vendor.email = vendorobj.bodyData.email ? vendorobj.bodyData.email : user.email;
            vendor.profileImageURL = vendorobj.bodyData.profileImageURL ? vendorobj.bodyData.profileImageURL : user.profileImageURL;
            await vendor.save();
            const { ...userData } = vendor;
            return {userData, status: true, msg: "Profile updated succesfully" }      
    },
}