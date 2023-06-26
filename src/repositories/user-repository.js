import httpStatus from 'http-status';
import models from '../models';
import bcrypt from 'bcryptjs';
import constant from '../constant';
import jwt from '../services/jwt';


const { user } = models;
export default {
      async createHashPassword(password) {
        try {
          const salt = await bcrypt.genSalt();
          return await bcrypt.hash(password, salt);

        }
        catch (error) {
          console.log(error);
        }
      },

      async signup(req) {
        try {
          const bodyData = req.body;
          const hashPassword = await this.createHashPassword(bodyData.password);
          bodyData.password = hashPassword;
          bodyData.role = constant.common.ROLE.USER
          const result = await user.create(bodyData);
          if (result)
            return result;
          return false;

        } catch (error) {
          throw Error(error);
        }
      },
      async signin(request) {
        const { email, password } = request.body;
        const havingEmail = await user.scope('customers').findOne({ where: { email: email } });
        if (havingEmail) {
          const isPasswordMatch = await this.compareUserPassword(password, havingEmail.password);
          if (isPasswordMatch) {
            const { ...userData } = havingEmail.get();
            const token = jwt.createToken(userData)
            return { token, ...userData };
          }
        }
        return { status: false, msg: "No User Found" };
      },
      async compareUserPassword(password, hashPassword) {
        let isPasswordMatch = '';
        if (password && hashPassword) {
          isPasswordMatch = await bcrypt.compare(password, hashPassword);
        }
        return isPasswordMatch;
      },
      
      async userUpdateProfile(request) {
        const userobj = { ...request.body };
        const userB = await user.scope('customers').findOne({ where: { id: userobj?.bodyData?.id } });
        if (!userB) {
            return { status: false, msg: "Invalid Request" }
        }
        userB.name = userobj.bodyData.name ? userobj.bodyData.name : user.name;
        userB.contact = userobj.bodyData.contact ? userobj.bodyData.contact : user.contact;
        userB.email = userobj.bodyData.email ? userobj.bodyData.email : user.email;
        userB.profileImageURL = userobj.bodyData.profileImageURL ? userobj.bodyData.profileImageURL : user.profileImageURL;
        await userB.save();
        const { ...userData } = userB;  
        return {userData, status: true, msg: "Profile updated succesfully" }      
    },
  }
