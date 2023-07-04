import httpStatus from "http-status";
import repositories from "../repositories";

const { productRepositories } = repositories;
export default {
    async uploadProduct(request, response, next) {
        try {
            let res;
            const result = await productRepositories.uploadProduct(request);
            if (result) {
                let productId = result.dataValues.id;
                for (let i = 0; i <= request.body.imageIdArray.length - 1; i++) {
                    let imageId = request.body.imageIdArray[i]; 
                    res = await productRepositories.uploadProductImage({ productId, imageId });
                }

                if (res) {
                    return response.status(httpStatus.OK).json({ result, message: 'Product Uploaded........' });
                }
            }
            return response.status(httpStatus.BAD_REQUEST).json({ message: 'SOMETHING WENT WRONG.....' });
        } catch (error) {
            //console.log(error);
            next(error)
        }
    },

    async productList(request, response, next) {
        try {
            const result = await productRepositories.productList()
            if (result) {
                return response.status(httpStatus.OK).json({ result, message: "product fetch successfully" });
            }
            return response.status(httpStatus.BAD_REQUEST).json({ message: "bad requesst" });
        } catch (error) {
            next(error);
        }
    },

    async productListById(request, response, next) {
        try {
            const result = await productRepositories.productListById(request);
            if (result) {
                return response.status(httpStatus.OK).json({ result, message: "product fetch successfully" });
            }
            return response.status(httpStatus.BAD_REQUEST).json({ message: "bad requesst" });
        } catch (error) {
            next(error);
        }
    },

    async moreProducts(request, response, next) {
        try {
            const result = await productRepositories.moreProductListById(request);
            if (result) {
                return response.status(httpStatus.OK).json({ result, message: "more product fetch successfully" });
            }
            return response.status(httpStatus.BAD_REQUEST).json({ message: "bad requesst" });
        } catch (error) {
            next(error);
        }
    },

    async productRemoveById(request, response, next) {
        try {
            const result = await productRepositories.productRemoveById(request);
            if (result) {
                return response.status(httpStatus.OK).json({ result, message: "product removed successfully" });
            }
            return response.status(httpStatus.BAD_REQUEST).json({ message: "bad requesst" });
        } catch (error) {
            next(error);
        }
    }
}