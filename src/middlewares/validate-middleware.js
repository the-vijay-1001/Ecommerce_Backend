const validateRequest = (options) => async (request, response, next) => {
    try {
        await options.schema.validateAsync({
            ...request.query,
            ...request.body,
            ...request.params,
        });
        next();
    } catch (error) {
       next(error)
    }
}

export default validateRequest;