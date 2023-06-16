import Joi from 'joi';

const userProfileUpdateSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .messages({
      'any.required': 'NAME_REQUIRED',
      'string.empty': 'NAME_REQUIRED',
      'string.min': 'NAME_MIN_VALIDATION',
      'string.max': 'NAME_MAX_VALIDATION',
    })
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .min(6)
    .max(50)
    .messages({
      'any.required': 'EMAIL_REQUIRED',
      'string.empty': 'EMAIL_REQUIRED', 
      'string.email': 'VALID_EMAIL_ALLOWED',
      'string.min': 'EMAIL_MIN_VALIDATION',
      'string.max': 'EMAIL_MAX_VALIDATION',
    })
    .required(),
  password: Joi.string()  
    .min(6)
    .label('Password')
    .required(),  
    
  phoneNumber: Joi.number()
    .required()
});
export default {
  userProfileUpdateSchema,
};
