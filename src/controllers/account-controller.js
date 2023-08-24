import repositories from '../repositories/index.js';
import httpStatus from 'http-status';
import HttpStatus from 'http-status';
const { accoutnRepositories, userRepositories } = repositories;
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiterForAttempts = new RateLimiterMemory({
    points: 5, // 5 points
    duration: 60, // per 60 seconds
    blockDuration: 10 * 60, // block for 10 minutes if more than points consumed
});

const rateLimiterForAccountAttempts = new RateLimiterMemory({
    points: 5, // 5 points
    duration: 60, // per 60 seconds
    blockDuration: 10 * 60, // block for 10 minutes if more than points consumed
});


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
            if (data.status) {
                return response.status(HttpStatus.OK).json({ data, message: 'SIGNIN SUCCESSS......' });
            }
            else {
                rateLimiterForAccountAttempts
                    .consume(request.ip)
                    .then(() => {
                        console.log("then")
                        return response.status(HttpStatus.OK).json({ data, message: 'INVALID CREDENTIAL' });
                    })
                    .catch(() => {
                        console.log("cathch")
                        return response.status(httpStatus.OK).json({
                            success: false,
                            data: [],
                            message: "To many attempts please try again after an houre...",
                        });
                    });
            }
            // return response.status(HttpStatus.BAD_REQUEST).json(data || { message: 'SOMETHING WENT WRONG.....' });
        } catch (error) {
            next(error)
        }
    },
    async vendorUpdateProfile(request, response, next) {
        try {

            const result = await accoutnRepositories.vendorUpdateProfile(request);

            if (result.status) {
                return response.status(HttpStatus.OK).json(result.userData.dataValues);
            }
            return response.status(HttpStatus.BAD_REQUEST).json(result || { message: 'SOMETHING WENT WRONG.....' });
        } catch (error) {
            next(error)
        }
    },


}