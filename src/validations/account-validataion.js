import Joi from "joi";

const userCreateSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(50).required(),
    password:Joi.string().min(8).required(),
    contact: Joi.string()
        .min(10)
        .max(10)
        .required(),
    role: Joi.string()
       .required(),
    status: Joi.boolean()
        .required()
})

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
})

export default {
    userCreateSchema,
    loginSchema
}