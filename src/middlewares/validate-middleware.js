const validateRequest = (options) => async (request, response, next) => {
    try {
        await options.schame.validateAsync({
            ...request.query,
            ...request.body,
            ...request.params,
        });
        next();
    } catch (error) {
        console.log(error);
    }
}

export default validateRequest;