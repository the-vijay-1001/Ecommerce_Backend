import repositories from '../repositories/index.js';
import HttpStatus from 'http-status';
const { accoutnRepositories, userRepositories } = repositories;
export default {
    async vendorSignup(request, response, next) {
        try {
            const result = await accoutnRepositories.vendorSignup(request);
            if (result) {
                return response.status(HttpStatus.OK).json({ result, message: 'SIGNUP SUCCESSS......' });
            }

            return response.status(HttpStatus.BAD_REQUEST).json({ message: 'SOMETHING WENT WRONG.....' });
        } catch (error) {
            next(error)
        }
    },
    async vendorSignin(request, response, next) {
        try {
            const data = await accoutnRepositories.vendorSignin(request);
            console.log("fkdkljlk");
            console.log(data);
            if (data?.token){
                return response.status(HttpStatus.OK).json({ data, message: 'SIGNIN SUCCESSS......' });
            }
            return response.status(HttpStatus.BAD_REQUEST).json(data || { message: 'SOMETHING WENT WRONG.....' });
        } catch (error) {
            next(error)
        }
    },
    async vendorUpdateProfile(request, response, next) {
        try {
                
            const result = await accoutnRepositories.vendorUpdateProfile(request);
            
            if (result.status){
                return response.status(HttpStatus.OK).json(result.userData.dataValues);
            }
            return response.status(HttpStatus.BAD_REQUEST).json(result || { message: 'SOMETHING WENT WRONG.....' });
        } catch (error) {
            next(error)
        }
    },
    
    
}