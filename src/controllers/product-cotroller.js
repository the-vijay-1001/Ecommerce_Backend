import httpStatus from "http-status";
import repositories from "../repositories";

const {productRepositories} = repositories;
export default {
    async uploadProduct(request, response, next) {
        try {
            const result = await productRepositories.uploadProduct(request);
            if (result) {
                // productRepositories.uploadProductImage(result.dataValues.id);
                return response.status(httpStatus.OK).json({ result, message: 'Product Uploaded........' });
            }

            return response.status(httpStatus.BAD_REQUEST).json({ message: 'SOMETHING WENT WRONG.....' });
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
}