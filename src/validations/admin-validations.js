import Joi from 'joi';

const adminSignInSchema = Joi.object({
    email: Joi.string()
        .min(7)
        .email()
        .required()
        .messages({
            'any.required':'email is required'
        }),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'The password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.',
            'any.required': 'The password is required.'
        })
})

const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .min(7)
        .email()
        .required()
        .messages({
            'any.required':'email is required'
        })
})


export default {
    adminSignInSchema,
    forgotPasswordSchema
}