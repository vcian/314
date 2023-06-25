import { celebrate, Joi } from 'celebrate';

const USER_SCHEMA = {
    AUTH: celebrate({
        body: Joi.object({
            email: Joi.string().required().messages({
                'string.empty': 'Email is not allowed to be empty',
                'string.base': 'Email must be string',
                'any.required': 'Email is required',
            }),
            password: Joi.string().required().messages({
                'string.empty': 'Password is not allowed to be empty',
                'string.base': 'Password must be string',
                'any.required': 'Password is required',
            }),
        }),
    }),
};

export { USER_SCHEMA };
