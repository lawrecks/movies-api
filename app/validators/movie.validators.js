import Joi from 'joi';
import baseValidator from '.';

const validateCreateBody = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};

export default validateCreateBody;
