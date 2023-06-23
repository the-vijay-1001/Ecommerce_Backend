import Joi from 'joi';

const   userLoginUpdateSchema= Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: false } })
  .min(6)
  .max(50)
  .pattern(/^[^\s]+$/)
  .messages({
    'any.required': 'EMAIL_REQUIRED',
    'string.empty': 'EMAIL_REQUIRED',
    'string.email': 'VALID_EMAIL_ALLOWED',
    'string.min': 'EMAIL_MIN_VALIDATION',
    'string.max': 'EMAIL_MAX_VALIDATION',
    'string.pattern.base': 'EMAIL_FORMAT_INVALID',
    'string.pattern': 'SPACES_NOT_ALLOWED_IN_EMAIL',
  })
  .required(),  


  password: Joi.string()  
    .min(6)
    .label('Password')
    .required(),
  contact : Joi.string()
  .min(10)
  .max(10)
});

const userProfileUpdateSchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(20)
  .pattern(/^\D*$/)
  .messages({
    'any.required': 'NAME_REQUIRED',
    'string.empty': 'NAME_REQUIRED',
    'string.min': 'NAME_MIN_VALIDATION',
    'string.max': 'NAME_MAX_VALIDATION',
    'string.pattern.base': 'NAME_NUMERIC_NOT_ALLOWED',
  })
  .required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: false } })
  .min(6)
  .max(50)
  .pattern(/^[^\s]+$/)
  .messages({
    'any.required': 'EMAIL_REQUIRED',
    'string.empty': 'EMAIL_REQUIRED',
    'string.email': 'VALID_EMAIL_ALLOWED',
    'string.min': 'EMAIL_MIN_VALIDATION',
    'string.max': 'EMAIL_MAX_VALIDATION',
    'string.pattern.base': 'EMAIL_FORMAT_INVALID',
    'string.pattern': 'SPACES_NOT_ALLOWED_IN_EMAIL',
  })
  .required(),  


  password: Joi.string()  
    .min(6)
    .label('Password')
    .required(),
  contact : Joi.string()
  .min(10)
  .max(10)
});
export default {
  userProfileUpdateSchema,
  userLoginUpdateSchema
};
