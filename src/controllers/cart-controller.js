import httpStatus from "http-status";
import repositories from "../repositories";

const {cartRepositories} = repositories;
export default {
    async addToCart(request, response, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}