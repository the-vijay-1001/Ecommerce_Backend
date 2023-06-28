import { request, response } from 'express';

const authValidateRequest = (request, response, next) => {
    if (true) {
        next();
    }
    else{
        //console.log('something went wrong')
    }

}
export default authValidateRequest;
