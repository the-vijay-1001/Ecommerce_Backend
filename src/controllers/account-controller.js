import repositories from "../repositories/index.js";
import HttpStatus from "http-status";
const { accoutnRepositories, userRepositories } = repositories;
export default {
    async userSignup(request, response, next) {
        try {
            const result = await accoutnRepositories.userSignup(request);
            if (result) {
                return response.status(HttpStatus.OK).json({ result, message: "SIGNUP SUCCESSS......" });
            }

            return response.status(HttpStatus.BAD_REQUEST).json({ message: "SOMETHING WENT WRONG....." });
        } catch (error) {
            console.log(error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
        }
    },
    async userSignin(request, response, next) {
        console.log("53..................................................1422222222222222222222")
        try {
            const { token } = await accoutnRepositories.userSignin(request);
            if (token){
                console.log("klfjasdlifuaer89tyuefhsdy89");
                return response.status(HttpStatus.OK).json({ token, message: "SIGNIN SUCCESSS......" });
            }
                

            return response.status(HttpStatus.BAD_REQUEST).json({ message: "SOMETHING WENT WRONG....." });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
        }
    }
}