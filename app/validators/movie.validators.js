import Joi from 'joi';
import baseValidator from '.';

export const validateCreateBody = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};

export const validateFetchParams = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.number().integer().positive(),
  });
  baseValidator(schema, req, res, next, 'params');
};
