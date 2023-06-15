import bcrypt from "bcryptjs";

export default {
    async createHashPassword(password){
        try {
            const salt = await bcrypt.genSalt();
            return await bcrypt.hash(password, salt);
          } catch (error) {
            console.log(error);
          }
    }
}