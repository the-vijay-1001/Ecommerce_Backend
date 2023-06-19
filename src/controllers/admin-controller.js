
import HttpStatus from 'http-status';
import repositories from '../repositories'

const { adminRepository } = repositories;
export default {
    async signin(req, res, next) {
        try {
            const result = await adminRepository.signIn(req.body);
            if (result.status)
                return res.status(HttpStatus.OK).json(result);
            throw new Error(result.msg);
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    async forgotPassword(req, res, next) {
        try {
            const result = await adminRepository.forgotPassword(req);
            console.log(result);
            if (result.status)
                return res.status(HttpStatus.OK).json(result);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);

        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    async verifyPassword(req, res, next) {
        try {
            const result = await adminRepository.verifyOtp(req);
            if (result.status)
                return res.status(HttpStatus.OK).json(result)
            throw new Error('Something went wrong !! Try again');
        } catch (err) {
            console.log(err)
            next(err);
        }
    },

    async updatePassword(req, res, next) {
        try {
            const result = await  adminRepository.updatePassword(req);
            if (result.status)
                return res.status(HttpStatus.OK).json(result);
           return res.status(HttpStatus.BAD_REQUEST).json(result);
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}

