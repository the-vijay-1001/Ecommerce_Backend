import models from '../models'
import bcrypt from 'bcryptjs'
import jwt from '../services/jwt';
import email from '../services/email';
import httpStatus from 'http-status';

const { user } = models;

export default {
    async signIn(adminObj) {
            let aObj = await user.scope('admin').findOne({ where: { email: adminObj.email } });
            if(!aObj)
            return {status:false,msg:"Email Not registered as admin"};
            aObj = aObj.dataValues;
            if (await this.comparePassword(adminObj.password, aObj.password)) {
                const token = jwt.createToken({ email: aObj.email });
                return { status: true, msg: "SignIn Success", token };
            }
            return { status: false, msg: "Passwords Did'nt Matched" }
    },
    async generateEncryptedPassword(password) {
        try {
            const salt = await bcrypt.genSalt();
            return await bcrypt.hash(password, salt);
        } catch (err) {
            console.log(err)
            throw new Error("Something went wrong");
        }
    },
    async comparePassword(password1, password2) {
        try {

            return await bcrypt.compare(password1, password2);
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async createAdmin(adminObj) {
        try {
            const salt = await bcrypt.genSalt();
            adminObj.password = await bcrypt.hash(adminObj.password, salt);
           user.create(adminObj);
        } catch (err) {
            console.log(err)
            return { status: false, msg: "Internal Server Error" }
        }
    },
    async forgotPasswordWithOtp(adminObj) {
        try {
            const existingAdmin = await user.findOne({ email: adminObj.email });

            if (!existingAdmin)
                return { status: false, msg: "No User Found" }

            const otp = await this.generateOtp(existingAdmin);

            const data = {
                to: existingAdmin.email,
                otp,
                msg: "Your Otp"
            }
            try {
                await email.sendOtp(data)
                return { status: true, msg: "Otp sent successfully to your resgistered email address ..." };

            } catch (err) {
                return { status: false, msg: "Something went wrong!! Try again" }
            }
        } catch (err) {
            console.log(err);
            return { status: false, msg: "Internal Server Error" }
        }
    },
    async generateOtp(adminObj) {
        try {
            const characters = '0123456789';
            const charactersLength = characters.length;
            let otp = '';

            for (let i = 0; i < 6; i++) {
                otp += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            adminObj.otp = otp;
            adminObj.save()

            return otp;
        } catch (err) {
            console.log(err)
            next(err);
        }
    },
    async verifyOtp(req) {
        try {
            const { adminId, otp } = req.body;
            const adminResult = await admin.findOne({ where: { id: adminId } });
            if (!adminResult)
                throw new Error("Something went wrong !!");
            let newDate = new Date();
            if (Math.abs(newDate.getTime() - adminResult.updatedAt.getTime()) >= 30 * 60 * 1000)
                throw new Error("Otp expired ...")
            if (otp == adminResult.otp) {
                adminResult.isOtpVerified = true;
                adminResult.save();
                return { status: true, msg: "Otp verified ..." }
            }
            return { status: false, msg: "Bad Request" }
        } catch (err) {
            console.log(err);
            return { status: false, msg: "Internal Server Error" }
        }
    },
    async updatePassword(req) {
        try {
            const { adminId, password } = req.body;
            const adminResult = await admin.findOne({ where: { id: adminId } });
            // admin = adminResult.dataValues;
            if (!adminResult)
                throw new Error("Something went wrong !!");
            let newDate = new Date();
            if (Math.abs(newDate.getTime() - adminResult.updatedAt.getTime()) >= 35 * 60 * 1000)
                return { status: false, msg: "Must ask for new otp . . ." }
            if (adminResult.isOtpVerified) {
                adminResult.password = await this.generateEncryptedPassword(password);
                adminResult.isOtpVerified = false;
                adminResult.save();
                return { status: true, msg: "Password updated succcessfully" }
            }
            return { status: false, msg: "Otp is not verified" }
        } catch (err) {
            console.log(err);
            // return { status: false, msg: "Internal Server Error" }
        }
    },
    async forgotPasword(req) {
        try {
            const existingAdmin = await user.scope('admin').findOne({ email: adminObj.email });

            if (!existingAdmin)
                return { status: false, msg: "No User Found" }

            const otp = await this.generateOtp(existingAdmin);

            const data = {
                to: existingAdmin.email,
                otp,
                msg: "Your Otp"
            }
            try {
                await email.sendOtp(data)
                return { status: true, msg: "Otp sent successfully to your resgistered email address ..." };

            } catch (err) {
                return { status: false, msg: "Something went wrong!! Try again" }
            }
        } catch (err) {
            console.log(err);
            return { status: false, msg: "Internal Server Error" }
        }
    }
}