import { celebrate, Joi } from 'celebrate';

const WORKSPACE_SCHEMA = {
  CREATE_WORKSPACE: celebrate({
    body: Joi.object({
      name: Joi.string().required().messages({
        'string.empty': 'Name is not allowed to be empty',
        'string.base': 'Name must be string',
        'any.required': 'Name is required',
      }),
    }),
  }),
  FIND_WORKSPACE: celebrate({
    params: Joi.object({
      slug: Joi.string().required().messages({
        'string.empty': 'Name is not allowed to be empty',
        'string.base': 'Name must be string',
        'any.required': 'Name is required',
      }),
    }),
  }),
  LIST_WORKSPACE: celebrate({
    query: Joi.object({
      page: Joi.number().integer().min(1).required().messages({
        'number.empty': 'page is not allowed to be empty',
        'number.base': 'page must be a number',
      }),
      limit: Joi.number().integer().required().messages({
        'number.empty': 'limit is not allowed to be empty',
        'number.base': 'limit must be a number',
      }),
      search: Joi.string().optional().messages({
        'string.empty': 'search is not allowed to be empty',
        'string.base': 'search must be a string',
      }),
    }),
  }),
  UPDATE_WORKSPACE: celebrate({
    params: Joi.object({
      slug: Joi.string().required().messages({
        'string.empty': 'Name is not allowed to be empty',
        'string.base': 'Name must be string',
        'any.required': 'Name is required',
      }),
    }),
  }),
};

export { WORKSPACE_SCHEMA };
